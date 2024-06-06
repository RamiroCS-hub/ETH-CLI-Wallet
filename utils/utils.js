import bcrypt from 'bcrypt'
import chalk from 'chalk'

export const hashPassword = async (pass) => {
  const hash = await bcrypt.hash(password, 3)
    .catch( err =>{
      console.log(chalk.redBright('Error hasing the password: ' + err.message))
      process.exit(1)
  })
  return hash
}

export const getKeyFromPass = async (password, web3, conf) => {
  const isCorrect = await bcrypt.compare(password, conf.get('password'))
    .catch(err => {
        console.log(chalk.red('Error comparing the password', err.message))
        process.exit(1)
    })
    if(!isCorrect) {
        console.log(chalk.red('Password is incorrect'))
        process.exit(0)
    }
   
    const decrypt = await web3.eth.accounts.decrypt(conf.get(`wallet:${conf.get('password')}`), password)
    return decrypt
}