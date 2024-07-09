/* eslint-disable require-jsdoc */
const Moralis = require('moralis').default;
const {Web3} = require('web3');
const BigNumber = require('bignumber.js');

const config = require('./../../config');
const MORALLIS_SETTINGS = config.CONFIG.moralis;
const abis = config.CONFIG.abis;
const web3 = new Web3('https://eth.llamarpc.com');

async function getTokensBalanceETHMoralis(wallet, tokens) {
  try {
    await Moralis.start({
      apiKey: MORALLIS_SETTINGS.masterKey,
    });

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: '0x1',
      tokenAddresses: tokens,
      address: wallet,
    });

    console.log(response.raw);
  } catch (e) {
    console.error(e);
  }
  return '';
}

async function getTokenBalanceETHWeb3(wallet, token) {
  try {
    const ERC20Contract = new web3.eth.Contract(abis.ERC20, token);
    const tokenSymbol = await ERC20Contract.methods.symbol().call();
    const tokenDecimals = await ERC20Contract.methods.decimals().call();
    const walletBalance = await ERC20Contract.methods.balanceOf(wallet).call();

    // Convert both walletBalance and tokenDecimals to BigNumber
    const walletBalanceBN = new BigNumber(walletBalance);
    const tokenDecimalsBN = new BigNumber(10).pow(tokenDecimals);

    // Divide wallet balance by the decimal value
    const walletBalanceFormatted = walletBalanceBN.div(tokenDecimalsBN);

    console.log(
        `Token (${token}) balance of ${wallet} is:
        ${walletBalanceFormatted}`,
    );

    return {
      wallet,
      token: tokenSymbol,
      balance: walletBalanceFormatted
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getTokensBalanceETHMoralis,
  getTokenBalanceETHWeb3,
};
