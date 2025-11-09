import { ethers } from 'ethers';
import dotenv from 'dotenv';
import fs from 'fs-extra';


dotenv.config();
const rpcUrl = process.env.ALCHEMY_RPC_URL;

console.log('ALCHEMY_RPC_URL:', rpcUrl);
console.log('\n')

const provider = new ethers.JsonRpcProvider(rpcUrl);
console.log('Provider created successfully.');
console.log(provider)
console.log('\n')

//使用钱包进行签名
const signer = new ethers.Wallet(
    process.env.RINKEBY_PRIVATE_KEY,
    provider
);
console.log('Wallet created successfully.');
console.log('Wallet address:', signer.address);
console.log('\n')


const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
const contractAddress = '0xc15e1ef0b9c3972231639127Afc6F72ea4c5b05D';
//实例化合约
const contract = new ethers.Contract(contractAddress, abi, signer)
//与合约交互
// await contract.store('7');
// await contract.addPerson('Alice', '42');
const currentFavoriteNumber = await contract.retrieve();
console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);

const nonce = await signer.getTransactionCount();
console.log('Nonce:', nonce);
const tx = {
	nonce: nonce,
	gasPrice: 20000000000,
	gasLimit: 1000000,
	to: null,
	value: 0,
	data: "0x" + binary,
	chainId: 1337,
};