var Web3 = require("web3");

var web3 = new Web3("HTTP://127.0.0.1:8545");

var WBNBaddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
var BDOaddress = "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454";
var BUSDaddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
var strategyAddress = "0xB885aF37aDb11e200747Ae9E8f693d0E44751c09";
var PancakeRouteraddress = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";

//this address has lots of busd
var unlockedAddress = "0x631fc1ea2270e98fbd9d92658ece0f5a269aa161";

var pancakeRouterAbi = require("./abi/PancakeSwapRouterAbi.json");
var strategyAbi = require("./abi/strategy.json");
var busdAbi = require("./abi/busd.json");

var account1;
var account2;

var Amount = web3.utils.toWei("10");

let PancakeRouter;
let Strategy;
let BUSDContract;

async function run() {
  //pancakse router contract instance
  PancakeRouter = new web3.eth.Contract(pancakeRouterAbi, PancakeRouteraddress);

  //strategy contract instance
  Strategy = new web3.eth.Contract(strategyAbi.abi, strategyAddress);

  BUSDContract = new web3.eth.Contract(busdAbi, BUSDaddress);

  // busd contract instance

  // initialize web3 accounts
  let accounts = await web3.eth.getAccounts()
    account1 = accounts[0];
    account2 = accounts[1];


  //approve pancake swap to take 10 busd
  await BUSDContract.methods.approve(PancakeRouteraddress, Amount).send({ from: account1 });

  console.log(
    `Address ${PancakeRouteraddress}  has been approved to spend ${Amount} x 10^-18 Busd by Owner:  ${account1}`
  );

  await BUSDContract.methods.transfer(account1, Amount).send({ from: unlockedAddress });

  let recipientBalance = await BUSDContract.methods.balanceOf(account1).call();

  console.log(`Recipient: ${account1} Busd Balance: ${recipientBalance}`);

  let blockData = await web3.eth.getBlock("pending");

  //The following line is an example of cube data declarations. Each one is a call of a function which is in the pancakeRouter contract with the respective parameters
  var data1 = PancakeRouter.methods
    .swapExactTokensForTokens(
      Amount,
      0,
      [BUSDaddress, BDOaddress],
      strategyAddress,
      blockData.timestamp + 10
    )
    .encodeABI();
  var data2 = PancakeRouter.methods
    .swapExactTokensForTokens(
      Amount,
      0,
      [BUSDaddress, WBNBaddress],
      strategyAddress,
      blockData.timestamp + 10
    )
    .encodeABI();

  var addCubes = await Strategy.methods
    .addCubes([PancakeRouteraddress, PancakeRouteraddress], [data1, data2], 0)
    .send({ from: account1 });

  console.log(addCubes, "add cubes data");
}

run();
