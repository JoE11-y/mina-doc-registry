import React, { createContext, useContext, useMemo, useReducer, useEffect, ReactNode } from "react"
import ZkappWorkerClient from "../../pages/zkappWorkerClient"

import {
    PublicKey,
    PrivateKey,
    Field,
} from 'snarkyjs'


// let [state, setState] = useState({
//     zkappWorkerClient: null as null | ZkappWorkerClient,
//     hasWallet: null as null | boolean,
//     hasBeenSetup: false,
//     accountExists: false,
//     currentNum: null as null | Field,
//     publicKey: null as null | PublicKey,
//     zkappPublicKey: null as null | PublicKey,
//     creatingTransaction: false,
// });

interface State {
    zkappWorkerClient: null | ZkappWorkerClient,
    hasWallet: null | boolean,
    hasBeenSetup: boolean,
    accountExists: boolean,
    registryHash: null | Field,
    noOfDocs: null | Field,
    publicKey: null | PublicKey,
    zkappPublicKey: null | PublicKey,
    creatingTransaction: boolean,
}

const INITIAL_STATE: State = {
    zkappWorkerClient: null,
    hasWallet: null,
    hasBeenSetup: false,
    accountExists: false,
    registryHash: null,
    noOfDocs: null,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false,
}

const SET_STATE = "SET_STATE"
const SET_ACCOUNT_STATUS = "SET_ACCOUNT_STATUS"
const SET_TRANSACTION_STATUS = "SET_TRANSACTION_STATUS"

interface SetState {
    type: "SET_STATE";
    data: {
        zkappWorkerClient: null | ZkappWorkerClient,
        hasWallet: null | boolean,
        hasBeenSetup: boolean,
        accountExists: boolean,
        registryHash: null | Field,
        noOfDocs: null | Field,
        publicKey: null | PublicKey,
        zkappPublicKey: null | PublicKey,
    }
}

interface SetAccountStatus {
    type: "SET_ACCOUNT_STATUS";
    data: {
        accountExists: boolean
    }
}

interface SetTransactionStatus {
    type: "SET_TRANSACTION_STATUS";
    data: {
        creatingTransaction: boolean;
    }
}

type Action = SetState | SetAccountStatus | SetTransactionStatus;


function reducer(state: State = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case SET_STATE: {
            return {
                ...state,
                ...action.data,
            }
        }
        case SET_ACCOUNT_STATUS: {
            return {
                ...state,
                ...action.data,
            }
        }
        case SET_TRANSACTION_STATUS: {
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            return state
    }
}

interface SetStateInputs {
    zkappWorkerClient: null | ZkappWorkerClient,
    hasWallet: null | boolean,
    hasBeenSetup: boolean,
    accountExists: boolean,
    registryHash: null | Field,
    noOfDocs: null | Field,
    publicKey: null | PublicKey,
    zkappPublicKey: null | PublicKey,
}

interface SetAccountStatusInputs {
    accountExists: boolean
}

interface SetTransactionStatusInputs {
    creatingTransaction: boolean;
}

const MinaWeb3Context = createContext({
    state: INITIAL_STATE,
    setState: (_data: SetStateInputs) => { },
    setAccountStatus: (_data: SetAccountStatusInputs) => { },
    setTransactionStatus: (_data: SetTransactionStatusInputs) => { },
})

export function useMinaWeb3Context() {
    return useContext(MinaWeb3Context)
}

interface ProviderProps {
    children?: ReactNode | undefined
}

export const MinaProvider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    function setState(data: SetStateInputs) {
        dispatch({
            type: SET_STATE,
            data,
        });
    }

    function setAccountStatus(data: SetAccountStatusInputs) {
        dispatch({
            type: SET_ACCOUNT_STATUS,
            data,
        })
    }
    function setTransactionStatus(data: SetTransactionStatusInputs) {
        dispatch({
            type: SET_TRANSACTION_STATUS,
            data,
        })
    }

    return (
        <MinaWeb3Context.Provider
            value={useMemo(() => ({
                state,
                setState,
                setAccountStatus,
                setTransactionStatus
            }),
                [state]
            )}
        >
            {children}
        </MinaWeb3Context.Provider>
    )
}