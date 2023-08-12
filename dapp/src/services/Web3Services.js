import Web3 from "web3";

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