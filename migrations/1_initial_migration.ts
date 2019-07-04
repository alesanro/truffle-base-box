import { Migration } from "truffle";

const Migrations = artifacts.require("Migrations");

module.exports = (deployer => {
  deployer.then(async () => {
    await deployer.deploy(Migrations);
  });
}) as Migration;

export {};
