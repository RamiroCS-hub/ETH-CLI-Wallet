import confModule from 'conf'
const conf = new confModule({projectName: 'eth-Wallet'})
import chalk from 'chalk'
import {Web3} from 'web3'
import dotenv from 'dotenv'
import { getKeyFromPass, hashPassword } from '../utils/utils.js'
dotenv.config()

const web3 = new Web3(process.env.TEST_NET)

export const createWallet = () => {
    const wallet = web3.eth.accounts.wallet.create(1)
    console.log('')
    console.log(chalk.blueBright(`Your address:`), wallet[0].address)
    console.log('')
    console.log(chalk.redBright('Your Private Key:'),wallet[0].privateKey)
    console.log('')
    conf.set('wallet', wallet[0].address)
}

export const getBalance = async () => {
    const actualWallet = conf.get('wallet')
    console.log('')
    console.log(chalk.cyan('Your balance is:'), web3.utils.fromWei(await web3.eth.getBalance(actualWallet), 'ether'), 'ETH')
    console.log('')
}

export const getAddress = () => {
    console.log('')
    console.log(chalk.magentaBright('Your adress is:'), conf.get('wallet'))
    console.log('')
}

export const encryptKey = async (key, password) => {
    const encrypted = await web3.eth.accounts.encrypt(key, password)
    
    console.log('')
    console.log(chalk.magentaBright('Successfully encrypted'))
    console.log('')

    conf.set('password', await hashPassword(password))
    conf.set(`wallet:${hashed}`, encrypted)
}

export const decryptKey = async (password) => {
    const decrypt = await getKeyFromPass(password, web3, conf)
    console.log('')
    console.log(chalk.redBright('Your private key is:'), decrypt.privateKey)
    console.log('')
}

export const loginUserWithPrivateKey = (key) => {
    const account = web3.eth.accounts.privateKeyToAccount(key)
    console.log('')
    console.log(chalk.magentaBright('Login successfully to address:'), account.address)
    console.log(chalk.redBright('Your private key is:'), account.privateKey)
    console.log('')
    conf.set('wallet', account.address)
}

export const makeTransaction = async (password, keyTo, amount) => {
    const address = conf.get('wallet')
    const transaction = {
        from: address,
        to: keyTo,
        value: amount,
        gas: 21000,
        maxFeePerGas: (await web3.eth.getBlock()).baseFeePerGas * 2n,
        maxPriorityFeePerGas: 100000, 
        gasLimit: 2000000
    }
    
    const key = await getKeyFromPass(password, web3, conf)
    const singnedTransaction = await web3.eth.accounts.signTransaction(transaction, key.privateKey)
    const tx = await web3.eth.sendSignedTransaction(singnedTransaction.rawTransaction)
    console.log('-----------', chalk.bold('Transaction Response'),'-----------')
    console.log(chalk.magentaBright('Block Hash:'), tx.blockHash)
    console.log(chalk.magentaBright('Gas Used:'), tx.gasUsed)
    console.log(chalk.magentaBright('Transation Hash:'), tx.transactionHash)
    console.log(chalk.magentaBright('To:'), tx.to)
    console.log('')
}

export const getGasPrice = async () => {
    console.log('')
    console.log(chalk.magentaBright('Gas price:'), await web3.eth.getGasPrice())
    console.log('')
}