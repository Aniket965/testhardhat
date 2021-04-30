const { expect } = require("chai");
const { ethers } = require("hardhat");
const initialSupply = 1000
const contracts = [
  "node_modules/@uniswap/v2-core/build/UniswapV2Factory.json",
  "node_modules/@uniswap/v2-periphery/build/UniswapV2Router02.json",
  "node_modules/@uniswap/v2-periphery/build/WETH9.json",
];
const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
describe("Animoji Coin", function() {
  it("test animoji coin", async function() {
    const amountIn = 500
    const gasLimit = 124500
    const Animoji = await ethers.getContractFactory("Animoji");
    // const artifacts = await ethers.artifacts.getArtifactPaths();
    // artifacts.push(...contracts.map((contract) => path.resolve(contract)));
  

    const animoji = await Animoji.deploy();
    console.log(animoji.address)
    const [owner] = await ethers.getSigners();
    const accounts = await ethers.getSigners();
    let ExchangeContract = await ethers.getContractFactory("Exchange");
    let exchange = await ExchangeContract.connect(owner).deploy();
    const router = await ethers.getContractAt('IUniswapV2Router02',routerAddress)
    console.log('owner address:' ,owner.address)  

    console.log('exchange address:' ,exchange.address)
    const intialOwnerBalance = await animoji.balanceOf(owner.address);
    await animoji.deployed();
    
    expect(await animoji.totalSupply()).to.equal(intialOwnerBalance);



    await animoji.approve(routerAddress, amountIn);
    const WETHaddress = await router.WETH();
    console.log('WETH addres,',WETHaddress)
   
    const tx  = await router.addLiquidityETH(animoji.address,500,1, ethers.utils.parseEther('0.2'), owner.address,1650976011, {
      value:ethers.utils.parseEther('1')
    })
    const ownerBalanceBeforeTransaction = await animoji.balanceOf(owner.address);
    console.log('Owner Balance Before Swap',ownerBalanceBeforeTransaction.toNumber() )
    const tx2  = await router.swapETHForExactTokens(5,[WETHaddress,animoji.address],owner.address,1650976011, {
      value:ethers.utils.parseEther('0.2')
    })
    
    console.log('Swaping 5 animoji tokens' )
    const ownerBalanceAfterTransaction = await animoji.balanceOf(owner.address);
    console.log('Owner Balance After Swap',ownerBalanceAfterTransaction.toNumber() )
  })

});
