import React from "react"
import { Container } from "react-bootstrap"
import { Header, Upload, Footer } from "../components"

const Submit = () => {
    return (
        <Container>
            <Header />
            <div className="my-5">
                <h5 className="fw-bold">Submit a Document</h5>
                <p>
                    Contract owners can register (upload) new documents to the "Document
                    Registry" smart contract on the Celo blockchain decentralized network.
                </p>
                <div>
                    <Upload id="documentForUpload" />
                </div>
            </div>
            <Footer />
        </Container>

    )
}

export default Submit