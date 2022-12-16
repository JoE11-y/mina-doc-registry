import React, { useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useMinaWeb3Context } from "../lib/context/minaWeb3"
import ZkappWorkerClient from "../pages/zkappWorkerClient"
import {
    PublicKey,
    PrivateKey,
    Field,
} from 'snarkyjs'

export const Status = () => {
    const { state, setAccountStatus, setState, setTransactionStatus } = useMinaWeb3Context()

    useEffect(() => {
        (async () => {
            if (!state.hasBeenSetup) {
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

                const zkappPublicKey = PublicKey.fromBase58('B62qph2VodgSo5NKn9gZta5BHNxppgZMDUihf1g7mXreL4uPJFXDGDA');

                await zkappWorkerClient.initZkappInstance(zkappPublicKey);

                console.log('getting zkApp state...');
                await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
                const currentNum = await zkappWorkerClient.getNum();
                console.log('current state:', currentNum.toString());

                setState({
                    zkappWorkerClient,
                    hasWallet: true,
                    hasBeenSetup: true,
                    publicKey,
                    zkappPublicKey,
                    accountExists,
                    currentNum
                });
            }
        })();
    }, [setState, state]);

    return (
        <>
            Status: <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true" className="opacity-25" />
        </>
    )
}
