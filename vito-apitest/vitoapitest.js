/* eslint-disable require-jsdoc */

const {
  // skipped this one because of the missing api key
  //   getTokensBalanceETHMoralis,
  getTokenBalanceETHWeb3,
} = require('./helper/vitoapitest');

async function run() {
  // skipped this one because of the missing api key
  //   await getTokensBalanceETHMoralis(
  //       '0xd343e9F123B5e03eB0427b3028d80AC6d10F7DF0',
  //       ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'],
  //   );

  await getTokenBalanceETHWeb3(
      '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  );

  console.log('Successfully finished.');
}

run();
