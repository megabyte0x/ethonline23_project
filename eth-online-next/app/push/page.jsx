"use client";
import { useAccountAbstraction } from '@/Context/accountAbstractionContext';
import { imgBase64 } from '@/constant/image';
import { PushAPI } from '@pushprotocol/restapi';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import { ChatUIProvider, ChatViewComponent, darkChatTheme } from '@pushprotocol/uiweb';
import { useEffect } from 'react';

// const chatIds = [
//   "249eaf6c2d283799471663461385b009cefae7615e4ccc27b175c39b1005ab4f",

// ]

const PushChat = () => {

    const { signer, ownerAddress } = useAccountAbstraction()
    const handle = async() => {
      
    const userAyushDev = await PushAPI.initialize(signer, { env: 'staging' });
    console.log(userAyushDev)
    const group = await userAyushDev.chat.group.create("zkMystic test", {
    description: 'A community of APE Coin holders enchanted by Mystic Arts, exploring DeFi realms.', // provide short description of group
    image: imgBase64, // provide base64 encoded image
    members: [], // not needed, rules define this, can omit
    admins: [], // not needed as per problem statement, can omit
    private: true,
    "rules": {
      "entry": { // permission object
        "conditions": { // conditions object
          "any": [ // conditions namespace decider - Either group owner / admin invites the user or the user has $PUSH on Ethereum or Polygon
            { // decider 1 - If admin or owner invites someone
              "any": [ 
                { // criteria 1
                  "type": "PUSH",
                  "category": "INVITE",
                  "subcategory": "DEFAULT",
                  "data": {
                      "inviterRoles": [
                          "ADMIN",
                          "OWNER"
                      ]
                  }
                }
              ]
            },
            {
              "any": [ // decider 2 - If user has $PUSH on Ethereum or on Polygon
                { // criteria object
                  "type": "PUSH", // define type that rules engine should go for
                  "category": "ERC20", // define it's ERC20 token that you want to check, supports ERC721 as well
                  "subcategory": "holder", // define if you are checking 'holder' or 'owner'
                  "data": { 
                    "contract": "eip155:8001:0x07ab44c33cE8953a1dEA9398cc902E43fd111cd5", // $PUSH address on ETH
                    "comparison": ">=", // what comparison needs to pass
                    "amount": 1, // amount that needs to passed
                    "decimals": 18, // the decimals for the token
                  }
                },
                { // criteria object
                  "type": "PUSH", // define type that rules engine should go for
                  "category": "ERC20", // define it's ERC20 token that you want to check, supports ERC721 as well
                  "subcategory": "holder", // define if you are checking 'holder' or 'owner'
                  "data": { 
                    "contract": "eip155:80001:0x07ab44c33cE8953a1dEA9398cc902E43fd111cd5", // $PUSH address on ETH
                    "comparison": ">=", // what comparison needs to pass
                    "amount": 1, // amount that needs to passed
                    "decimals": 18, // the decimals for the token
                  }
                }
              ]
            }
          ]
        }
      }
      // since we are not defining chat permissions, it means that any user who is part of the group can chat
    }
  })
  console.log(group)
    }


  return (
    <ChatUIProvider signer={signer} account={ownerAddress} env={"staging"} theme={darkChatTheme}>
        <div>Push</div>
        <button onClick={handle}>create</button>

        <ChatViewComponent chatId='69159d7bfdb8ee705e436decf8a425423d90b7e2b24ea53b9541d7fa45154ef3' limit={10} />
         
    </ChatUIProvider>
    
  )
}

export default PushChat