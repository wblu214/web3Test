// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {HelloWeb3} from "./HelloWeb3.sol";

contract SimpleContractFactory{

    HelloWeb3[] public simpleStorageFactortList;

    function createSimpleStorageContract() public {

        HelloWeb3 simpleStorageContract = new HelloWeb3();
        simpleStorageFactortList.push(simpleStorageContract);
    }

    function sdStore(uint256 _simpleStorageIndex,uint256 _newSimpleStorageNumber) public {
        //执行一个合约，需要两个条件 1.合约地址 2.合约ABI
        HelloWeb3 myHelloWeb3 = simpleStorageFactortList[_simpleStorageIndex];
        myHelloWeb3.store(_newSimpleStorageNumber);
    }

    function sdGet(uint256 _simpleStorageIndex) public view returns (uint256){
        return  simpleStorageFactortList[_simpleStorageIndex].look();
    }
}