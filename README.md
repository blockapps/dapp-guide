# STRATO Decentralized Applications Guide

## STRATO Decentralized Applications
TODO: some marketing text here

## Introduction
STRATO decentralized application is a browser web application, which interacts with smart contract on the deployed on [BlockApps STRATO](http://blockapps.net/blockapps-strato-blockchain-application-development/) using various APIs that handle method invocations, contract calls and transaction signing.

## dApp structure

1. The applications are packaged as a collection of smart contracts and front end code.
2. The front end interacts directly with the smart contracts using the REST APIs provided by [BlockApps STRATO](http://blockapps.net/blockapps-strato-blockchain-application-development/)
3. The app should use `index.html` as an entry point to the application, which in turn loads all other static resources (js and css). You can look at [lottery-demo-app](https://github.com/blockapps/lottery-demo-app) or this [example](https://github.com/blockapps/dapp-guide/tree/master/example).
4. Since the UI maybe shipped to different nodes, `index.html` should use only relatives path instead of absolute paths for local static resources.


## Deploying a STRATO dApp with STRATO Management Dashboard

### metadata.json
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


### Deployment
1. Open the STRATO Management Dashboard in your browser by entering the STRATO node URL (enter the login credentials if prompted: `admin/admin` by default)
2. Create the user account if you don't have one on this node and faucet it with some ether:
    1. Go to "Accounts" tab
    2. Click "Create User" button
    3. Submit the form
    4. Click "Faucet" button when user appears in the list
    5. Copy user's account address (account column)
3. Go to "Apps" tab
4. Click "Deploy" button
5. Submit the form using the user credentials, the account address from buffer and your Zip package.
6. In few seconds you should be able to see your new app in the list

## Launch STRATO dApp
To run the decentralized application in SMD:

1. Go to "Apps" tab
2. Click the "Launch" button by the app in the list
3. ...
4. PROFIT!
