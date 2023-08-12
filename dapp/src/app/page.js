"use client";

//sobrescreve o head da pagina
import Head from "next/head";

import { doLogin } from "@/services/Web3Services";

import { useState } from "react";

export default function Home() {

  const [message, setMessage] = useState("");

  function btnLoginClick(){
    setMessage("Conectando na sua carteira... aguarde...");
    doLogin()
    .then(wallet => setMessage(wallet))
    .catch(err => setMessage(err))
  }

  return (
    <>
    <Head>
      <title>CrypTwitter | login</title>
      <meta charset="utf8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src="https://cdn.pixabay.com/photo/2021/05/26/19/32/ethereum-6286123_1280.jpg" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3"> CrypTwitter Smart Contract</h1>
          <p className="lead">Sua rede social descentralizada</p>
          <p className="lead mb-3"> Autentique-se com a sua carteira, escreva suas mensagens, compartilhe conosco!</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick}>
              <img src="/metamask.svg" width="64" className="me-3" />
              Conectar com a Metamask
            </button>
          </div>
          <p className="message">{message}</p>
        </div>
      </div>
    </div>
    </>
  )
}
