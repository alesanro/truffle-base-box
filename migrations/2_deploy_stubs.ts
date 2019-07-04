import { Migration } from "truffle";

const Clock = artifacts.require("Clock");
const Mock = artifacts.require("Mock");

module.exports = ((deployer, network) => {
  if (network !== "development") {
    return;
  }

  deployer.then(async () => {
    await deployer.deploy(Clock);
    await deployer.deploy(Mock);
  });
}) as Migration;

export {};
