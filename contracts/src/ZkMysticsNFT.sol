// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract zkMysticsNFT is IERC721, ERC721 {
    uint256 private _tokenId;

    constructor() ERC721("zkMysticsNFT", "ZKM") {}

    function mintNFT(address _to) external {
        unchecked {
            _tokenId++;
        }
        _safeMint(_to, _tokenId);
    }
}
