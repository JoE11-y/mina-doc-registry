import {
  Mina,
  isReady,
  PublicKey,
  fetchAccount,
  CircuitString,
  MerkleWitness
} from 'snarkyjs'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;
export class MyMerkleWitness extends MerkleWitness(20) { }

// ---------------------------------------------------------------------------------------

import type { DocRegistry } from '../../contracts/src/DocRegistry';
import type { Add } from '../../contracts/src/Add';

const state = {
  DocRegistry: null as null | typeof DocRegistry,
  zkapp: null as null | DocRegistry,
  uploadTransaction: null as null | Transaction,
  verifyTransaction: null as null | Transaction,
}

// ---------------------------------------------------------------------------------------

const functions = {
  loadSnarkyJS: async (args: {}) => {
    await isReady;
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.BerkeleyQANet(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { DocRegistry } = await import('../../contracts/build/src/DocRegistry.js');
    state.DocRegistry = DocRegistry;
  },
  compileContract: async (args: {}) => {
    await state.DocRegistry!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.DocRegistry!(publicKey);
  },
  getNumOfDocs: async (args: {}) => {
    const noOfDocs = await state.zkapp!.noOfDocs.get();
    return JSON.stringify(noOfDocs.toJSON());
  },
  getRegistryHash: async (args: {}) => {
    const registryHash = await state.zkapp!.registryHash.get();
    return JSON.stringify(registryHash.toJSON);
  },
  createUploadTransaction: async (args: { docHash: CircuitString, path: MyMerkleWitness }) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.uploadDoc(args.docHash, args.path);
    }
    );
    state.uploadTransaction = transaction;
  },
  createVerifyTransaction: async (args: { docHash: CircuitString, path: MyMerkleWitness }) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.verify(args.docHash, args.path);
    }
    );
    state.verifyTransaction = transaction;
  },
  proveUploadTransaction: async (args: {}) => {
    await state.uploadTransaction!.prove();
  },
  proveVerifyTransaction: async (args: {}) => {
    await state.verifyTransaction!.prove();
  },
  getUploadTransactionJSON: async (args: {}) => {
    return state.uploadTransaction!.toJSON();
  },
  getVerifyTransactionJSON: async (args: {}) => {
    return state.verifyTransaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number,
  fn: WorkerFunctions,
  args: any
}

export type ZkappWorkerReponse = {
  id: number,
  data: any
}
if (process.browser) {
  addEventListener('message', async (event: MessageEvent<ZkappWorkerRequest>) => {
    const returnData = await functions[event.data.fn](event.data.args);

    const message: ZkappWorkerReponse = {
      id: event.data.id,
      data: returnData,
    }
    postMessage(message)
  });
}
