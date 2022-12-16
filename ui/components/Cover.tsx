import React from 'react';
import { Button } from "react-bootstrap";

interface Props {
  name: string,
  coverImg: string,
  login: Function,
}

export const Cover: React.FC<Props> = ({ name, coverImg, login }) => {
  if (name) {
    return (
      <div
        className="d-flex justify-content-center flex-column text-center "
        style={{ background: "#282c34", minHeight: "100vh" }}
      >
        <div className="mt-auto text-light mb-5">
          <div
            className=" ratio ratio-1x1 mx-auto mb-2"
            style={{ maxWidth: "320px" }}
          >
            <img src={coverImg} alt="" />
          </div>
          <h1>{name}</h1>
          <p>Please connect your wallet to continue.</p>
          <Button
            onClick={() => login().catch((e: Error) => console.log(e))}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Connect Wallet
          </Button>
        </div>

        <p className="mt-auto text-secondary">Powered by Near</p>
      </div>
    );
  }

  return null;
};
