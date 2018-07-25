"use strict"
import { addABI, removeABI, decodeLogs, } from "abi-decoder"

export default class {

	/**
   * Looks for an event in transaction receipt according to provided contracts
   * if such event emitted by one of these contracts.
   * @param {array} contracts array of deployed contracts
   * @param {tx} tx transaction from invoked function
   * @param {string} eventName name of an event to look for
   * @returns {promise} list of events found, empty otherwise
   */
	findEvent(contracts, tx, eventName) {
		return this.findEvents(contracts, tx, e => e.name === eventName)
	}

	/**
   * Looks for events in transaction receipt according to provided contracts
   * if such events emitted by one of these contracts. Use comparator function
   * to pick appropriate events.
   * @param {array} contracts array of deployed contracts
   * @param {tx} tx transaction from invoked function
   * @param {(object) => (boolean)} comparator comparison function; signature (logEntity) => bool
   */
	findEvents(contracts, tx, comparator) {
		function _updateWithArgs(event) {
			var args = {}
			for (var arg of event.events) {
				args[arg.name] = arg.value
			}

			event["args"] = args

			return event
		}

		contracts.forEach(c => addABI(c.abi))

		const logs = decodeLogs(tx.receipt.logs)
		const events = logs
			.filter(l => l !== undefined)
			.filter(l => l !== null)
			.filter(l => comparator(l))
			.map(l => _updateWithArgs(l))

		contracts.forEach(c => removeABI(c.abi))

		return Promise.resolve(events)
	}
}
