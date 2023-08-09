// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

struct Tweet{
    address author;
    string text;
    uint timestamp;
    string username;
}

contract CrypTwitter {

    //inteiros positivos
    uint public nextId = 0;

    uint public constant PAGE_SIZE = 10;

    //criar estrutura da dados personalizada
    mapping(uint => Tweet) public  tweets;

    mapping (address => string) public users;

    //Comportamentos
    //calldata -> em memoria, não será escrito no disco (readOnly)
    function addTweet(string calldata text) public {
        //memory permite escrita
        Tweet memory newTweet;
        newTweet.text = text;
        // endereço da carteira do autor do tweet. toda transação tem um obj associado chamado msg.
        // Neste obj tenho um prop que é a sender, ou seja, o endereço da carteira de quem enviou o tweet.
        newTweet.author = msg.sender; 
        // como é salvo tudo em bloco. consigo pegar o momento em que o dado foi registrado.
        newTweet.timestamp = block.timestamp; 

        //gerar o Id do tweet
        nextId++;
        tweets[nextId] = newTweet;
    }

    function changeusername(string calldata newName) public{
        users[msg.sender] = newName;
    }

    //readonly
    function getLastTweets(uint page) public view returns (Tweet[] memory) {
        if(page < 1) page = 1;

        uint startIndex = (PAGE_SIZE * (page - 1)) + 1;

        //array de tweets em memoria
        Tweet[] memory lastTweets = new Tweet[](PAGE_SIZE);
        //guardar um a um no meu array
        for (uint i=0; i < PAGE_SIZE; i++){
            lastTweets[i] = tweets[startIndex + i];
            lastTweets[i].username = users[lastTweets[i].author];
        }

        return lastTweets;
    }
}