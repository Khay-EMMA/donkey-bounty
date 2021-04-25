var Web3 = require("web3");

var web3 = new Web3("HTTP://127.0.0.1:8545");

var WBNBaddress="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
var BDOaddress="0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454";
var BUSDaddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
var strategyAddress = "0xB885aF37aDb11e200747Ae9E8f693d0E44751c09";
var PancakeRouteraddress="0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";

var pancakeRouterAbi = require("./abi/PancakeSwapRouterAbi.json")

var Amount = web3.utils.toWei('1');

let PancakeRouter;
let Strategy;

async function run () {

    //pancakse router contract instance
    PancakeRouter = new web3.eth.Contract(pancakeRouterAbi, PancakeRouteraddress);

    console.log(PancakeRouter, "router contract")

}

 run();