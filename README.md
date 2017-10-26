# Building Decentralized Apps with BlockApps STRATO

BlockApps STRATO is the fastest way to build, launch, and deploy decentralized apps. 

## Build your own dApp with STRATO

The STRATO dApp portal is a browser-based web application interacting with the STRATO blockchain via REST API calls. The dApp portal is a browser web application, which interacts with smart contract on the deployed on [BlockApps STRATO](http://blockapps.net/blockapps-strato-blockchain-application-development/) using various APIs that handle method invocations, contract calls and transaction signing.

## Requirements for the STRATO dApp Portal

1. STRATO dApp portal is currently a client-side only app, fully-running in the user's browser;
2. STRATO dApp portal should not have any pre-deployed contracts on the blockchain before initiating transactions to blockchain from the dApp;
3. `index.html` should be the only entry point to the dApp and may include external Javascript and static files;
4. UI files should not contain the absolute paths to local files (links starting with `/`). All links and paths should be relative to the index.html location;

## dApp structure

1. The applications are packaged as a collection of smart contracts and front end code.
2. The front end interacts directly with the smart contracts using the REST APIs provided by [BlockApps STRATO](http://blockapps.net/blockapps-strato-blockchain-application-development/)
3. The app should use `index.html` as an entry point to the application, which in turn loads all other static resources (js and css). You can look at [lottery-demo-app](https://github.com/blockapps/lottery-demo-app) or this [example](https://github.com/blockapps/dapp-guide/tree/master/example).
4. Since the UI maybe shipped to different nodes, `index.html` should use only relatives path instead of absolute paths for local static resources.

## Deploying a dApp with STRATO Management Dashboard (SMD)

### metadata.json
Your application should have a text file called `metadata.json` in the root folder. `metadata.json` defines the application (1) name, (2) version, (3) description and (4) maintainer of the dApp.

STRATO  dApps need a `metadata.json` file in the root folder, defining the name of the application, it's version, description and maintainer information.

Example:

```
{
  "name": "my_dApp",
  "version": "0.0.1",
  "description": "Most useful and helpful decentralized application ever.",
  "maintainer": "Alice, alice@example.com"
}
```


### Packaging

Your dApp should be packaged as a Zip file.

File structure of the Zip archive is strictly defined:

STRATO dApp should be packaged as a zip archive which contains the smart contracts and the UI, with the following format.

```
.zip
├─ contracts/
│   └─ ...all solidity contract files (*.sol)
│
├─ ui/
│   ├─ index.html
│   └─ ...other ui application files used by index.html
│
└─ metadata.json
```

You may name the Zip file whatever you would like. 

Coming soon (next release): a CLI tool to test whether your dApp is packaged properly. 

### Deployment
1. Open the STRATO Management Dashboard in your browser by entering the STRATO node URL (enter the login credentials if prompted: `admin/admin` by default)
2. Create a user account if you don't have one on this node, and click "faucet" to add ether to the account:
    1. Go to "Accounts" tab
    2. Click "Create User" button
    3. Submit the form
    4. Click "Faucet" button when the user appears in the list
    5. Copy user's account address (account column)
3. Go to "Apps" tab
4. Click "Deploy" button
5. Submit the form using the user credentials, the account address from buffer and your Zip package.
6. In a few seconds, you should be able to see your new app in the list. *This may take up to a minute*. 

## Launch Your dApp!

To run the decentralized application in SMD:

1. Go to "Apps" tab
2. Navigate to the dApp you wish to deploy and click "launch"
3. Congratulations! Your dApp is now available on the STRATO dApp portal. 
