require('babel-register')
require('babel-polyfill')

module.exports = {
	networks: {
		development: {
			host: 'localhost',
			port: 8545,
			network_id: '*', // Match any network id
			gas: 8000000,
		},
	},
	solc: {
		optimizer: {
			enabled: true,
			runs: 200,
		},
	},
	migrations_directory: './migrations',
	mocha: {
		useColors: true,
		timeout: 0,
	},
}