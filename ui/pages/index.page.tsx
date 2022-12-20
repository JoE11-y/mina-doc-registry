import React from "react";
import { Container } from "react-bootstrap"
import { Header, Footer } from "../components";
import { useMinaWeb3Context } from "../lib/context/minaWeb3";
function Index() {
  const { state } = useMinaWeb3Context()
  return (
    <Container>
      <Header />
      <div>
        <section id="viewHome" className="my-5">
          <h1>Document Registry</h1>
          Welcome to the Document Registry DApp. This decentralized app runs on
          the Mina Protocol network and holds a registry of documents in an on chain hash.
          <ul>
            <li>
              The registry keeps the hashes of the documents along with their
              publish date.
            </li>
            <li>
              <b className="fw-bold">Contract owner</b> can submit new documents
              to be stored on the blockchain.
            </li>
            <li>
              <b className="fw-bold">Users</b> can verify the existence of certain
              document in the registry.
            </li>
            <li>
              Contract <b className="fw-bold">address</b> (on Berkeley testnet):{" "}
              <a href={state.zkappPublicKey != null ? `https://berkeley.minaexplorer.com/wallet/${state.zkappPublicKey.toBase58()}` : "https://berkeley.minaexplorer.com/wallet/"} id="contractLink" target="_blank" rel="noreferrer">
                {" "}
                {state.zkappPublicKey != null ? state.zkappPublicKey.toBase58() : "Loading..."}
              </a>
            </li>
            <li>
              Number of <b className="fw-bold">Documents</b> in registry:{" "}
              <b className="fw-bold">
                <a id="docsInRegistry" href="#docsInRegistry">
                  {state.noOfDocs?.toString()}
                </a>
              </b>{" "}
              Documents
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </Container >

  )
}

export default Index