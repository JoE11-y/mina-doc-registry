import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useMinaWeb3Context } from "../lib/context/minaWeb3"
import ZkappWorkerClient from "../pages/zkappWorkerClient"
import {
    PublicKey,
} from 'snarkyjs'

export const Status = () => {
    const { state, setAccountStatus, setState } = useMinaWeb3Context()
    const [loading, setLoading] = useState(false);

    const auroLink = 'https://www.aurowallet.com/';
    const auroLinkElem = <a href={auroLink} target="_blank" rel="noreferrer"> [Link] </a>

    // const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
    const faucetLink = "https://faucet.minaprotocol.com/?address=";
    // -------------------------------------------------------
    // Do Setup

    useEffect(() => {
        (async () => {
            if (!state.hasBeenSetup) {
                setLoading(true);
                const zkappWorkerClient = new ZkappWorkerClient();

                console.log('Loading SnarkyJS...');
                await zkappWorkerClient.loadSnarkyJS();
                console.log('done');

                await zkappWorkerClient.setActiveInstanceToBerkeley();

                const mina = (window as any).mina;

                if (mina == null) {
                    setState({ ...state, hasWallet: false });
                    return;
                }

                const publicKeyBase58: string = (await mina.requestAccounts())[0];
                const publicKey = PublicKey.fromBase58(publicKeyBase58);

                console.log('using key', publicKey.toBase58());

                console.log('checking if account exists...');
                const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
                const accountExists = res.error == null;

                await zkappWorkerClient.loadContract();

                console.log('compiling zkApp');
                await zkappWorkerClient.compileContract();
                console.log('zkApp compiled');

                const zkappPublicKey = PublicKey.fromBase58('B62qiVYJgMHVjqEMVjBdFr8XHCQ358MWpUHqQ6gbWPbE9Ef9jQYDMu1');
                const res2 = await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey! });
                const zkAppExists = res2.error == null;
                let noOfDocs = null;
                let registryHash = null;
                if (zkAppExists) {
                    await zkappWorkerClient.initZkappInstance(zkappPublicKey);
                    console.log('getting zkApp state...');
                    await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
                    noOfDocs = await zkappWorkerClient.getNumOfDocs();
                    registryHash = await zkappWorkerClient.getRegistryHash();
                    console.log('current states:', noOfDocs.toString(), registryHash.toString());
                }
                setState({
                    zkappWorkerClient,
                    hasWallet: true,
                    hasBeenSetup: true,
                    publicKey,
                    zkappPublicKey,
                    accountExists,
                    noOfDocs,
                    registryHash
                });
                setLoading(false);
            }
        })();
    }, [setState, state]);

    // -------------------------------------------------------
    // Wait for account to exist, if it didn't

    useEffect(() => {
        (async () => {
            if (state.hasBeenSetup && !state.accountExists) {
                setLoading(true);
                for (; ;) {
                    console.log('checking if account exists...');
                    const res = await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! })
                    const accountExists = res.error == null;
                    if (accountExists) {
                        break;
                    }
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }
                setAccountStatus({ accountExists: true });
                setLoading(false);
            }
        })();
    }, [state.hasBeenSetup]);

    return (
        <>
            Status:
            {
                loading ?
                    <> Loading ZKApp <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true" className="opacity-25" /> </>
                    : (state.hasWallet != null && !state.hasWallet) ?
                        <div> Could not find a wallet. Install Auro wallet here: {auroLinkElem}</div>
                        : (state.hasBeenSetup && !state.accountExists) ?
                            <div>
                                Account does not exist. Please visit the faucet to fund this account
                                <a href={faucetLink} target="_blank" rel="noreferrer"> [Link] </a>
                            </div>
                            :
                            "Active"
            }
        </>
    )
}
