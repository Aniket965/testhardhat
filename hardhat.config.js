require("@nomiclabs/hardhat-waffle");
const path = require('path')


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const contracts = [
  "node_modules/@uniswap/v2-core/build/UniswapV2Factory.json",
  "node_modules/@uniswap/v2-periphery/build/UniswapV2Router02.json",
  "node_modules/@uniswap/v2-periphery/build/WETH9.json",
];
task('compile').setAction(async (_, runtime, runSuper) => {
  await runSuper();
  const artifacts = await runtime.artifacts.getArtifactPaths();
  artifacts.push(...contracts.map((contract) => path.resolve(contract)));


});

task('compile:solidity:get-compiler-input').setAction(async (_, __, runSuper) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const input = await runSuper();
  // eslint-disable-next-line
  input.settings.outputSelection["*"]["*"].push("storageLayout");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return input;
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.6",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/xxxx",
        blockNumber: 12232904,
      },
    },
  },
};
