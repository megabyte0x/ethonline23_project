import {
  ZkMystics__CheckStatusRequestCreated as ZkMystics__CheckStatusRequestCreatedEvent,
  ZkMystics__StatusChecked as ZkMystics__StatusCheckedEvent
} from "../generated/zkMysticReceiver/zkMysticReceiver"
import {
  ZkMystics__CheckStatusRequestCreated,
  ZkMystics__StatusChecked
} from "../generated/schema"

export function handleZkMystics__CheckStatusRequestCreated(
  event: ZkMystics__CheckStatusRequestCreatedEvent
): void {
  let entity = new ZkMystics__CheckStatusRequestCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.assetAddress = event.params.assetAddress
  entity.destinationNetwork = event.params.destinationNetwork

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleZkMystics__StatusChecked(
  event: ZkMystics__StatusCheckedEvent
): void {
  let entity = new ZkMystics__StatusChecked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.assetAddress = event.params.assetAddress
  entity.assetType = event.params.assetType
  entity.result = event.params.result

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
