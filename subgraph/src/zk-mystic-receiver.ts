import {
  ZkMystics__CheckStatusRequestCreated as ZkMystics__CheckStatusRequestCreatedEvent,
  ZkMystics__StatusChecked as ZkMystics__StatusCheckedEvent
} from "../generated/zkMysticReceiver/zkMysticReceiver"
import {
  ZkMystics__CheckStatusRequestCreated,
  ZkMystics__StatusChecked
} from "../generated/schema"

export function handleZkMystics__StatusChecked(
  event: ZkMystics__StatusCheckedEvent
): void {
  let entity = new ZkMystics__StatusChecked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.assetAddress = event.params.assetAddress
  entity.result = event.params.result

  entity.save()
}
