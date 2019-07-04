"use strict";

require("ts-node/register");

const testrpcConfig = require("./testrpc.json");

module.exports = {
  networks: {
    development: {
      host: testrpcConfig.host,
      port: testrpcConfig.port,
      network_id: testrpcConfig.network_id,
      gas: testrpcConfig.gasLimit,
      gasPrice: testrpcConfig.gasPrice
    }
  },
  compilers: {
    solc: {
      version: "0.4.26",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        }
      }
    }
  },
  mocha: {
    useColors: true,
    timeout: 0,
    reporter: "eth-gas-reporter"
  },
  migrations_directory: process.env.MIGRATIONS_DIRECTORY || "./dist/migrations"
};
