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

const wallet = new ethers.Wallet(
	process.env.RINKEBY_PRIVATE_KEY,
	provider
);
console.log('Wallet created successfully.');
console.log('Wallet address:', wallet.address);
console.log('\n')


const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

const contract = await contractFactory.deploy();
await contract.waitForDeployment();  // 等到合约真正部署完成


const realAddress = contract.target;
console.log('合约部署成功！');
console.log(`Contract deployed at address: ${realAddress}`);
console.log('\n')

const currentFavoriteNumber = await contract.retrieve();
console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);

// // 若要拿交易对象：
// const tx = contract.deploymentTransaction();
// await tx.wait();    