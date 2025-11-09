from solcx import compile_standard, install_solc
import json
from web3 import Web3
import os

# from dotenv import load_dotenv

# load_dotenv()

with open("./SimpleStorage.sol", "r") as file:
    simple_storage_file = file.read()

# compile the .sol code
install_solc("0.8.7")
compiled_sol = compile_standard(
    {
        "language": "Solidity",
        "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
        "settings": {
            "outputSelection": {
                "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
            }
        },
    },
    solc_version="0.8.7",
)

with open("compiled_code.json", "w") as file:
    json.dump(compiled_sol, file)

# get bytecode
bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"][
    "bytecode"
]["object"]

# get abi
abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

# connecting to ganache
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7555"))
chain_id = 1337
my_address = "0x5144d3ad6E98973fFc67C5dA061688Daa1BdCcE9"
private_key = "0x271a5b2ac94dc5671a71511978aa2d508391492a05979c74098dca8d07711b11"

# connecting to rinkeby
# w3 = Web3(
#     Web3.HTTPProvider("https://rinkeby.infura.io/v3/ea1c309ed48e4ff2a6bf73491076d950")
# )
# chain_id = 4
# my_address = "0x32e590eE65137DB6c262d66ADaE445BfF5f5F087"

# private_key = os.getenv("PRIVATE_KEY")

# Create the contract in Python
SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

# Get the latest transaction
nonce = w3.eth.get_transaction_count(my_address)

# 1. Build a transactio
# 2. Sign a transaction
# 3. Send a transaction

transaction = SimpleStorage.constructor().build_transaction(
    {
        "chainId": chain_id,
        # "gasPrice": w3.to_wei(1, "gwei"),  # 设置较低的 Gas Price
        "gasPrice": w3.eth.gas_price,
        "from": my_address,
        "nonce": nonce,
    }
)
signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)

print("Deploying contract...")
tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)


simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)
print("Deployed!")

print("Updating contract...")
store_transaction = simple_storage.functions.store(67).build_transaction(
    {    sed -i '' 's/7890/3067/g' ~/.zshrc
    source ~/.zshrc
        "chainId": chain_id,
        "gasPrice": w3.eth.gas_price,
        "from": my_address,
        "nonce": nonce + 1,
    }
)


signed_store_txn = w3.eth.account.sign_transaction(
    store_transaction, private_key=private_key
)
send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.raw_transaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)
print("Updated!")