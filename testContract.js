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
const wallet = new ethers.Wallet(
    process.env.RINKEBY_PRIVATE_KEY,
    provider
);
console.log('Wallet linked successfully.');
console.log('Wallet address:', wallet.address);
console.log('\n')


const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
const contractAddress = '0xc15e1ef0b9c3972231639127Afc6F72ea4c5b05D';
//实例化合约
const contract = new ethers.Contract(contractAddress, abi, wallet);

const flag = false;
if(flag){
	//自己构造交易
	//create contract interface
	const iface = new ethers.Interface(abi);
	const data = iface.encodeFunctionData('store', [7]);
	const tx = {
		nonce: await wallet.getNonce(),
		gasPrice: 20000000000,
		gasLimit: 1000000,
		to: contractAddress,
		value: 0,
		data: data,
		chainId: 11155111,
	};

	//sign the transaction
	// const signedTx = await wallet.signTransaction(tx);
	//send the transaction
	const sentTx = await wallet.sendTransaction(tx);
	console.log('Transaction hash:', sentTx.hash);
}else{
	//使用合约方法构造交易
        const tx = await contract.store(7);
        console.log('Transaction hash:', tx.hash);
        await tx.wait();
        console.log('Transaction confirmed!');
		const currentFavoriteNumber = await contract.retrieve();
		console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
		console.log('Current nonce is', await wallet.getNonce());
}

