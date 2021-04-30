// SPDX-License-Identifier: MIT

pragma solidity 0.6.6;

import "hardhat/console.sol";

import {
  IUniswapV2Router02
} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

import {
  UniswapV2Library
} from "@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol";


import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
contract Exchange {
  address internal routerAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

  IUniswapV2Router02 internal router = IUniswapV2Router02(routerAddress);

  function performSwap(uint256 amountIn,address coinAddress) external {
    address[] memory path = new address[](2);
    path[0] = coinAddress;
    path[1] = router.WETH();
    router.swapExactTokensForETH(
      amountIn,
      0,
      path,
      msg.sender,
      block.timestamp
    );
  }


function addLiquidityETH(
  address token,
  uint amountTokenDesired,
  uint amountTokenMin,
  uint amountETHMin,
  address to,
  uint deadline
) external payable returns (uint256) {
    uint256 _collectedEth = 1;

		address burnAddress = address(0x0);
    router.addLiquidityETH.value(1)(token, amountTokenDesired, amountTokenMin, amountETHMin, burnAddress, deadline);
    return 1;
}

}