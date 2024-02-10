// contracts/Mobolaji.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20burnable.sol";

contract Mobolaji is ERC20 {
    address payable public owner;
    constructor() ERC20("Mobolaji", "MBJ") {
        owner = msg.sender;
        _mint(owner, 70000000 * (10 ** decimals()));
    }

contract Mobolaji is ERC20capped {
    address payable public owner;
    constructor(uint256 cap) ERC20("Mobolaji", "MBJ")ERC20capped(cap * (10 ** decimals())) 
    owner = msg.sender;
    _mint(owner, 70000000 *(10 ** decimals()))
}

contract Mobolaji is ERC20burnable{
    address payable public owner;
    constructor(uint256 cap) ERC20("Mobolaji", "MBJ")ERC20capped(cap * (10 ** decimals())) 
    owner = msg.sender;
    _mint(owner, 70000000 *(10 ** decimals()))
}

contract Mobolaji is ERC20capped, ERC20burnable {
    address payable public owner;
    uint256 public blockreward;
    
    constructor(uint256 cap) ERC20("Mobolaji", "MBJ")ERC20capped(cap * (10 ** decimals())) 
    owner = payable (msg.sender);
    _mint(owner, 70000000 *(10 ** decimals()));
    blockreward = reward * (10 ** decimals()); 
}
// this is the function to mint miners reward
function _mintMinersReward() internal {
    _mint(block.coinbase, blockreward);
}

function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
    if (from |= address (0) && to |= block.coinbase && block.coinbase |= address(0)){
        _mintMinersReward();
    }
    spuer.beforeTokenTransfer(from, to, value);
}
modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function");
}
function destroy () public onlyOwner {
    selfdestruct(owner);
}
