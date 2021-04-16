const { expect } = require("chai");

describe("Animoji Coin", function() {
  it("test animoji coin", async function() {
    
    const Animoji = await ethers.getContractFactory("Animoji");
    const animoji = await Animoji.deploy();
    const [owner] = await ethers.getSigners();
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
      console.log(account.address);
    }
    const intialOwnerBalance = await animoji.balanceOf(owner.address);
    await animoji.deployed();
    
    expect(await animoji.totalSupply()).to.equal(intialOwnerBalance);
    await animoji.transfer(accounts[1].address,50);
    expect(await animoji.balanceOf(owner.address)).to.equal(intialOwnerBalance - 50);
    expect(await animoji.balanceOf(accounts[1].address)).to.equal(50);
    expect(await animoji.counter()).to.equal(1);
    await animoji.mint(10);
    try {
      await animoji.burn(10)
    }catch (err) {
      expect(err.message.includes('COUNTLIMIT:burining not allowed yet')).to.be.equal(true)
    }
    expect(await animoji.totalSupply()).to.equal(1000010);
    expect(await animoji.counter()).to.equal(2);
    for(let i = 0; i < 100; i++) {
      await animoji.transfer(accounts[1].address,50);
    }
    expect(await animoji.counter()).to.equal(102);
    await animoji.burn(10);
    expect(await animoji.totalSupply()).to.equal(1000000);
    expect(await animoji.counter()).to.equal(103);
    try {
      await animoji.mint(10)
    }catch (err) {
      expect(err.message.includes('revert COUNTLIMIT: is greater than limit')).to.be.equal(true)
    }
  });
});
