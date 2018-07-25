const Clock = artifacts.require("Clock")
const Converter = artifacts.require("Converter")
const Mock = artifacts.require("Mock")

module.exports = (deployer, network) => {
	if (network !== "development") {
		return
	}

	deployer.then(async () => {
		await deployer.deploy(Clock)
		await deployer.deploy(Converter)
		await deployer.deploy(Mock)
	})
}