const Clock = artifacts.require("Clock")
const Converter = artifacts.require("Converter")
const Mock = artifacts.require("Mock")

import EventsHelper from './helpers/eventsHelper'
import Reverter from "./helpers/reverter"

contract("Test Example", accounts => {
	const eventsHelper = new EventsHelper()
	const reverter = new Reverter(web3)

	const contracts = {
		clock: null,
		converter: null,
		mock: null,
	}

	before(async () => {
		await reverter.snapshot()

		contracts.clock = await Clock.deployed()
		contracts.converter = await Converter.deployed()
		contracts.mock = await Mock.deployed()
	})

	after(async () => {
		await reverter.revert(0)
	})

	context("mocks", () => {

		afterEach(async () => {
			await reverter.revert()
		})

		it("have events", async () => {
			const tx = await contracts.converter.performMethod3(0, "string", "bytes")
			const events = await eventsHelper.findEvent([contracts.converter,], tx, "MethodInvoked")
			assert.lengthOf(events, 1)

			const event = events[0]
			assert.equal(event.name, "MethodInvoked")
			assert.equal(event.address, contracts.converter.address)
			assert.equal(event.args.methodName, "performMethod3")
			assert.isDefined(event.args.msgData)
			assert.equal(event.args.sender, accounts[0])
		})
	})
})