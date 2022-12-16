import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { Header, Footer } from "../components";
function Index() {
  const [docNo, setDocNo] = useState(0);
  useEffect(() => {

  }, []);
  return (
    <Container>
      <Header />
      <div>
        <section id="viewHome" className="my-5">
          <h1>Document Registry</h1>
          Welcome to the "Document Registry" DApp. This decentralized app runs on
          the Near Protocol network and holds a registry of documents in on chain.
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
              Contract <b className="fw-bold">address</b> (on Near testnet):{" "}
              <a href="https://explorer.testnet.near.org/accounts/docreg.tamaraebi.testnet" id="contractLink" target="_blank" rel="noreferrer">
                {" "}
                docreg.tamaraebi.testnet
              </a>
            </li>
            <li>
              Number of <b className="fw-bold">Documents</b> in registry:{" "}
              <b className="fw-bold">
                <a id="docsInRegistry" href="#docsInRegistry">
                  {docNo}
                </a>
              </b>{" "}
              Documents
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </Container>

  )
}

export default Index