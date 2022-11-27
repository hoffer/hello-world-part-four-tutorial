# 📝 Hello World Part Four Tutorial

This repository contains the starter files (`starter-files`) and completed version (`completed`) of Alchemy's [Hello World Part 4 Tutorial](https://app.gitbook.com/@alchemyapi/s/alchemy/tutorials/hello-world-smart-contract/creating-a-full-stack-dapp). 

## ℹ️ About the tutorial

In this tutorial, we'll teach you how to create a full stack dApp by connecting your Hello World smart contract to a React frontend using Metamask and Web3 tools.

## 🤔 Note

Niether the `starter-files` nor `completed` have their `node_modules` folder. Before running `npm start` in your terminal to start the React project, run `npm install` to download all the package dependencies.


to start the app, first need setup env, login to https://dashboard.alchemy.com/ and click `viewKey`
```
cd starter-files
export REACT_APP_ALCHEMY_KEY=wss://eth-goerli.g.alchemy.com/v2/xxxxxxxxxxxxxxxxxxxxx
npm start
```

- `SendEth` Usage example:
    - recipient: 0xD6e51c495635cedA51161576adaCe1A1D18E1C26,0xd0375B49837d24BF26afcB777E3995Caba6da619
    - amount: 1000000000000000
- `SendToken` Usage example:
    - recipient: 0xD6e51c495635cedA51161576adaCe1A1D18E1C26,0xd0375B49837d24BF26afcB777E3995Caba6da619
    - amount: 100000
    - token contract: 0x07865c6E87B9F70255377e024ace6630C1Eaa37F