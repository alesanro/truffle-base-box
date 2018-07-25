"use strict"

export default class Reverter {

	constructor(web3) {
		this.web3 = web3
		this.snapshotId = undefined
	}

	/**
     * Reverts changes in testrpc.
     * @param {int} id snapshotId to which revert will be applied. Default: this.snapshotId. If '0' then reverts to the first snapshot
     */
	revert(id) {
		const self = this
		const toSnapshotId = (id === undefined) ? self.snapshotId : (id <= 0 ? 1 : (id > self.snapshotId ? self.snapshotId : id))

		return new Promise((resolve, reject) => {
			web3.currentProvider.sendAsync({
				jsonrpc: '2.0',
				method: 'evm_revert',
				id: new Date().getTime(),
				params: [toSnapshotId,],
			}, err => {
				if (err) {
					return reject(err)
				}
				return resolve(self.snapshot())
			})
		})
	}

	/**
     * Makes the next snapshot in testrpc.
     */
	snapshot() {
		const self = this
		return new Promise((resolve, reject) => {
			self.web3.currentProvider.sendAsync({
				jsonrpc: '2.0',
				method: 'evm_snapshot',
				id: new Date().getTime(),
			}, (err, result) => {
				if (err) {
					return reject(err)
				}
				self.snapshotId = self.web3.toDecimal(result.result)
				return resolve()
			})
		})
	}
}
