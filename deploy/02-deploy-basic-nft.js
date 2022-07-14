const { getNamedAccounts, deployments, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async function () {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = []

    const basicNft = await deploy("BasicNFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!network.chainId == 31337 && process.env.ETHERSCAN_API_KEY) {
        log("Verifying")
        await verify(basicNft.address, args)
    }
    log("--------------------------")
}

module.exports.tags = ["all", "basicNft"]
