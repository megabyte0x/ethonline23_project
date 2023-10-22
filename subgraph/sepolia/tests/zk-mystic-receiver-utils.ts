import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ZkMystics__CheckStatusRequestCreated,
  ZkMystics__StatusChecked
} from "../generated/zkMysticReceiver/zkMysticReceiver"

export function createZkMystics__CheckStatusRequestCreatedEvent(
  userAddress: Address,
  assetAddress: Address,
  destinationNetwork: BigInt
): ZkMystics__CheckStatusRequestCreated {
  let zkMysticsCheckStatusRequestCreatedEvent = changetype<
    ZkMystics__CheckStatusRequestCreated
  >(newMockEvent())

  zkMysticsCheckStatusRequestCreatedEvent.parameters = new Array()

  zkMysticsCheckStatusRequestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  zkMysticsCheckStatusRequestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "assetAddress",
      ethereum.Value.fromAddress(assetAddress)
    )
  )
  zkMysticsCheckStatusRequestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "destinationNetwork",
      ethereum.Value.fromUnsignedBigInt(destinationNetwork)
    )
  )

  return zkMysticsCheckStatusRequestCreatedEvent
}

export function createZkMystics__StatusCheckedEvent(
  userAddress: Address,
  assetAddress: Address,
  assetType: i32,
  result: boolean
): ZkMystics__StatusChecked {
  let zkMysticsStatusCheckedEvent = changetype<ZkMystics__StatusChecked>(
    newMockEvent()
  )

  zkMysticsStatusCheckedEvent.parameters = new Array()

  zkMysticsStatusCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  zkMysticsStatusCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "assetAddress",
      ethereum.Value.fromAddress(assetAddress)
    )
  )
  zkMysticsStatusCheckedEvent.parameters.push(
    new ethereum.EventParam(
      "assetType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(assetType))
    )
  )
  zkMysticsStatusCheckedEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBoolean(result))
  )

  return zkMysticsStatusCheckedEvent
}
