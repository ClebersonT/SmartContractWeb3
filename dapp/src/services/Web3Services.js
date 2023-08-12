import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x6C76831bCb8f4693Cb0e159e2f9eb6fe0d76E208";

export async function doLogin(){
    //se não tenho quer dizer que não tenho Metamask
    if(!window.ethereum) throw new Error("No Metamask found");

    //estabelecendo uma conexão
    const web3 = new Web3(window.ethereum);
    //se o user autorizar, terá uma conta
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Wallet not found or allowed");

    //espaço de armazenamento do navegador para pegar dados da carteira
    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract(){
    if(!window.ethereum) throw new Error("No Metamask found");

    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");

    //retorna obj de comunicacao com o contrato
    return new web3.eth.Contract( ABI, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text){
    const contract = getContract();
    return contract.methods.addTweet(text).send();
}

export async function ChangeUsername(newName){
    const contract = getContract();
    return contract.methods.ChangeUsername(newName).send();
}

export async function getLastTweets(page){
    const contract = getContract();
    const tweets = await contract.methods.getLastTweets(page).call();
    return tweets.map(t => {return {...t} }).filter(t => t.text !== "");
}