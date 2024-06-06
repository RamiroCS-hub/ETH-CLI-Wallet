# Wallet Instalation
You can install the CLI wallet as an npm package using the following command:
```npm install my_eth_wallet```

# Wallet Commands

Use the wallet prefix to execute the following commands:

- **create**: Create a new Wallet.
- **get-balance**: Get information about the Wallet.
- **get-address**: Get the current Wallet address.
- **encrypt-key <key> <password>**: Encrypt and store your current private key.
- **decrypt-key <password>**: Retrieve your stored private key.
- **login <private key>**: Log in to an existing Wallet using the private key.
- **transaction <password> <address to send> <amount to send (Wei)>**: Make a transaction to another Wallet.
- **help [command]**: Display help for a specific command.

You need to provide an RPC node if you want to use the wallet. For example, in the .env file:
```TEST_NET= https: https://sepolia.infura.io/v3/YOUR_ID```