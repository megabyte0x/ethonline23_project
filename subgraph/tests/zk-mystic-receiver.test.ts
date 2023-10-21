import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ZkMystics__CheckStatusRequestCreated } from "../generated/schema"
import { ZkMystics__CheckStatusRequestCreated as ZkMystics__CheckStatusRequestCreatedEvent } from "../generated/zkMysticReceiver/zkMysticReceiver"
import { handleZkMystics__CheckStatusRequestCreated } from "../src/zk-mystic-receiver"
import { createZkMystics__CheckStatusRequestCreatedEvent } from "./zk-mystic-receiver-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let assetAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let destinationNetwork = BigInt.fromI32(234)
    let newZkMystics__CheckStatusRequestCreatedEvent = createZkMystics__CheckStatusRequestCreatedEvent(
      userAddress,
      assetAddress,
      destinationNetwork
    )
    handleZkMystics__CheckStatusRequestCreated(
      newZkMystics__CheckStatusRequestCreatedEvent
    )
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ZkMystics__CheckStatusRequestCreated created and stored", () => {
    assert.entityCount("ZkMystics__CheckStatusRequestCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ZkMystics__CheckStatusRequestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "userAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ZkMystics__CheckStatusRequestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assetAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ZkMystics__CheckStatusRequestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "destinationNetwork",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
