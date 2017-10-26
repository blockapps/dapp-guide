# STRATO decentralized applications guide

## STRATO Decentralized applications
TODO: some marketing text here

## Create the STRATO dApp
STRATO decentralized application is the browser web application interacting with the STRATO blockchain via REST API calls.

Requirements for the STRATO dApps:

1. STRATO dApp is currently the client-side only app, fully-running in user's browser;
2. STRATO dApp should not have the pre-deployed contracts on the blockchain before user initiates the transactions to blockchain from the dApp;
3. index.html should be the only entry point to the app and may include external javascript and static files;
4. UI files should not contain the absolute paths to local files (links starting with `/`). All links and paths should be relative to index.html location;

TODOs:
todo: The links to simple storage example (future link: https://github.com/blockapps/dapp-guide/example) and to lottery app (https://github.com/blockapps/lottery-demo-app)
todo: somewhere mention how to make ReactJS to use relative paths (`"homepage": "."` in package.json)

## Package and deploy the STRATO dApp with SMD

### metadata.json
Your application should have the `metadata.json` file in the root folder, defining the name of the application, it's version, description and maintainer info.
It is a text file in json format.

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

STRATO dApp should be packaged in the Zip file.

File structure of the Zip archive is strictly defined:
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

Zip file name may be random.

Coming soon: the CLI tool to test the validity of your dApp packaging

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

