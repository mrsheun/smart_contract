const {expect} = require ("chai");
const hre = require ("hardhat");

describe ("mobolaji contract", function(){
    //global vars
    let Tokens;
    let mobolaji;
    let owner;
    let addr1;
    let addr2;
    let tokencap = 100000000;
    let tokenBlockReward = 50;
    
    beforeEach(async function() {
        //Get the contratfactory and signers here.
        Token = await ethers.getContractFactory("Mobolaji");
        [owner, addr1, addr2] = await hre.ethers.getSigners();

        Mobolaji = await Token.deploy(tokencap, tokenBlockReward);
    });


    describe("Deployment", function () {
        it("Should set the  right owner", async function () {
        expect(await mobolaji.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of token to the owner", async function () {
        const ownerBalance = await mobolaji.balanceOF(owner.address);
        expect(await mobolaji.totalSupply()).to.equal(ownerBalance);

    });

    it("Should set the max capped supply to the argument provided during the deployment", async function (){
        const cap = await mobolaji.cap();
        expect(Number(hre.ethers.utils.formatEtheer(cap))).to.equal(tokencap);
    });

    it("should set the blockReward to the argument provided during deployment", async function () {
        const blockReward = await mobolaji.blockReward();
        expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
    });
});
it("Should update balances after transfers", async function () {
    const initialOwnerBalance = mobolaji.balanceOF(owner.address);

    //Transfer 100 tokens from owner to addr1.
    await mobolaji.transfer(addr1.address, 100);

    //Transfer another 50 Tokens from owner to addr2.
    await mobolaji.transfer(addr2.address, 50);

    //check balances.
    const finalOwnerBalance = await mobolaji.balanceOF(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

    const addr1Balance = await mobolaji.balanceOF(addr1.address);
    expect(addr1Balance).to.equal(100);

    const addr2Balance = await mobolaji.balanceOF(addr2.address);
    expect(addr2Balance).to.equal(50);
})

it("Should fail if sender doen't have sufficient tokens", async function () {
    const initialOwnerBalance = await mobolaji.balanceOF(owner.address);
    //Try to send 1 token from addr1 (0 token) to owner (1000000 tokens).
    //'require' will evaluate false and revert the transaction.
    await expect(
        mobolaji.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    //Owner balance shouldn't have changed.
    expect(await mobolaji.balanceOF(owner.address)).to.equal(
        initialOwnerBalance
    );
});

it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await mobolaji.balanceOF(owner.address);
})
});

