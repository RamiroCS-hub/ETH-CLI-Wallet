#! /usr/bin/env node

import { program }  from 'commander'
import {createWallet, getBalance, getAddress, encryptKey, decryptKey, loginUserWithPrivateKey, makeTransaction, getGasPrice} from './comands/commands.js'

//const web3 = new Web3(process.env.TEST_NET)

const list = () => {
  console.log('List')
}

program
    .command('create')
    .description('Create a new Wallet')
    .action(createWallet)

program
  .command('get-balance')
  .description('Get the wallet info')
  .action(getBalance)

program
  .command('get-address')
  .description('Get the actual wallet address')
  .action(getAddress)

program
  .command('encrypt-key')
  .argument('<key>')
  .argument('<password>')
  .description('Encrypt and store your actual private key')
  .action(encryptKey)

program
  .command('decrypt-key')
  .argument('<password>')
  .description('Get your stored private key')
  .action(decryptKey)

program
  .command('login')
  .argument('<private key>')
  .description('Login to an existing wallet using the private key')
  .action(loginUserWithPrivateKey)

program
  .command('transaction')
  .description('Make a transaction to another wallet')
  .argument('<password>')
  .argument('<address to send>')
  .argument('<amount to send (Wei)>')
  .action(makeTransaction)

program
  .command('gas-price')
  .description('Get an aproximate price for gas')
  .action(getGasPrice)
  
program.parse()
/*
web3.eth.getBlockNumber().then(console.log);

const wallet = wlt.create(1);
const encryptWallet = await wallet.encrypt('test')
console.log(wallet)
console.log(encryptWallet)
console.log(await wallet.decrypt(encryptWallet, 'test'))
const accounts = await web3.eth.getAccounts()
console.log(accounts)*/
