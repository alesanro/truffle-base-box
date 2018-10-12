/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
require('babel-register')
require('babel-polyfill')

const testrpcConfig = require("./testrpc.json")

module.exports = {
	networks: {
		development: {
			host: "localhost",
			port: testrpcConfig.port,
			network_id: "*", // Match any network id
			gas: testrpcConfig.gasLimit,
			gasPrice: testrpcConfig.gasPrice,
		},
		coverage: {
			host: "localhost",
			network_id: "*",
			port: 8555, // <-- If you change this, also set the port option in .solcover.js.
			gas: 0xfffffffffff, // <-- Use this high gas value
			gasPrice: 0x01, // <-- Use this low gas price
		},
	},
	solc: {
		optimizer: {
			enabled: true,
			runs: 200,
		},
	},
	mocha: {
		useColors: true,
		timeout: 0,
	},
	migrations_directory: './migrations',
	contracts_build_directory: process.env.CONTRACTS_BUILD_DIRECTORY || "./build/contracts",
}