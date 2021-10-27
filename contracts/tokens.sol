// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token1 is ERC20 {
    constructor() ERC20("Token1","TOK1") {
        _mint(msg.sender, 1_000_000 * 10 ** 18);
    }
}


contract Token2 is ERC20 {
    constructor() ERC20("Token2","TOK2") {
        _mint(msg.sender, 1_000_000 * 10 ** 18);
    }
}