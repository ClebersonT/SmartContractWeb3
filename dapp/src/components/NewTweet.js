"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addTweet } from "@/services/Web3Services";

//é comum em next, componentizar a nossa interface, separar em blocos
export default function NewTweet(){

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const { push } = useRouter();

    function btnPublishClick(){
       setMessage("Enviando seu tweet para a blockchain... aguarde...");
       addTweet(text)
       .then(result => {
        setText("");
        setMessage("Tweet foi enviado. Aguarde um instante para atualizar!")
       })
       .catch( err => {
        setMessage(err.message);
        console.error(err);
       })
    }

    //se não tem carteira... redireciona pra tela inicial
    useEffect(() =>{
        const wallet = localStorage.getItem("wallet");
        if(!wallet)
            push("/");
    }, [])
    
    return(
        <>
            <div className="top">
                <div className="left">
                    <img src="/twitter.svg" className="brand"/>
                </div>
                <h1>
                    Bem vindo
                </h1>
                <p> No que está pensando?</p>
                <textarea className="form-control my-3" value={text} onChange={evt=> setText(evt.target.value)}></textarea>
                <div>
                    <input type="button" onClick={btnPublishClick} className="btn btn-primary" value="Publicar" />
                    <span className="message"> {message} </span>
                </div>
            </div>
        </>
    )
}