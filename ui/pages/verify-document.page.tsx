import React from "react"
import { Container } from "react-bootstrap"
import { Upload, Header, Footer } from "../components"

const Verify = () => {
    return (
        <Container >
            <Header />
            <div className="my-5">
                <h5 className="fw-bold">Verify a Document</h5>
                <p>
                    Blockchain users can verify documents by checking whether they exist in
                    the Document Registry smart contract on the Mina Protocol
                    decentralized network.
                </p>
                <Upload id="documentToVerify" />
            </div>
            <Footer />
        </Container>
    )
}

export default Verify