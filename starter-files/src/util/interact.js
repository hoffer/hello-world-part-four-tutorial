require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../contract-abi.json");
const contractAddress = "0x0d8afA80469776a703E670110456C4e03945abD1";

export const helloWorldContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export const loadContractOwner = async () => { 
    const owner = await helloWorldContract.methods.owner().call(); 
    return owner;
};

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
        const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const obj = {
            status: "👆🏽 Write a message in the text-field above.",
            address: addressArray[0],
        };
        return obj;
        } catch (err) {
        return {
            address: "",
            status: "😥 " + err.message,
        };
        }
    } else {
        return {
        address: "",
        status: (
            <span>
            <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
                </a>
            </p>
            </span>
        ),
        };
    }
};


export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
        const addressArray = await window.ethereum.request({
            method: "eth_accounts",
        });
        if (addressArray.length > 0) {
            return {
            address: addressArray[0],
            status: "Write a message in the text-field above.",
            };
        } else {
            return {
            address: "",
            status: "Connect to Metamask using the top right button.",
            };
        }
        } catch (err) {
        return {
            address: "",
            status: ":( " + err.message,
        };
        }
    } else {
        return {
        address: "",
        status: (
            <span>
            <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
                </a>
            </p>
            </span>
        ),
        };
    }
};


export const sendEth = async (sender_address, to_addresses, amount) => {
    //input error handling
    if (!window.ethereum || sender_address === null) {
        return {
        status:
            "💡 Connect your Metamask wallet",
        };
    }

    let to_address_list = to_addresses.trim().split(",")

    if (!(to_address_list && to_address_list.length > 0)) {
        return {
            status: "❌ Your receipt address cannot be an empty string.",
        };
    }

    var amount_int = parseInt(amount, 10)

    if (amount_int <= 0 ) {
        return {
            status: "❌ Your sending amount cannot be 0",
        };
    }
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: sender_address, // must match user's active address.
        value: '0x'+ (amount_int * to_address_list.length).toString(16), // calc total ETH and convert to string
        data: helloWorldContract.methods.sendETH(to_address_list, '0x'+ amount_int.toString(16)).encodeABI(),
    };

    // return {
    //     status: transactionParameters.value,
    // };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
        });
        return {
        status: (
            <span>
            ✅{" "}
            <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
                View the status of your transaction on Etherscan!
            </a>
            <br />
            ℹ️ Once the transaction is verified by the network, the message will
            be updated automatically.
            </span>
        ),
        };
    } catch (error) {
        return {
        status: "😥 " + error.message,
        };
    }
};



export const sendToken = async (sender_address, token_address, to_addresses, amount) => {
    //input error handling
    if (!window.ethereum || sender_address === null) {
        return {
        status:
            "💡 Connect your Metamask wallet",
        };
    }

    let to_address_list = to_addresses.trim().split(",")

    if (!token_address) {
        return {
            status: "❌ Token address cannot be an empty string.",
        };
    }

    if (!(to_address_list && to_address_list.length > 0)) {
        return {
            status: "❌ Receipt address cannot be an empty string.",
        };
    }

    var amount_int = parseInt(amount, 10)

    if (amount_int <= 0 ) {
        return {
            status: "❌ Your sending amount cannot be 0",
        };
    }
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: sender_address, // must match user's active address.
        value: '0x0',
        data: helloWorldContract.methods.send(token_address, to_address_list, '0x'+ amount_int.toString(16)).encodeABI(),
    };

    // return {
    //     status: transactionParameters.value,
    // };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
        });
        return {
        status: (
            <span>
            ✅{" "}
            <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
                View the status of your transaction on Etherscan!
            </a>
            <br />
            ℹ️ Once the transaction is verified by the network, the message will
            be updated automatically.
            </span>
        ),
        };
    } catch (error) {
        return {
        status: "😥 " + error.message,
        };
    }
};

