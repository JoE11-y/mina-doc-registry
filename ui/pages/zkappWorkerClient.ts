import {
  fetchAccount,
  PublicKey,
  Field,
  CircuitString
} from 'snarkyjs'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions, MyMerkleWitness } from './zkappWorker';

export default class ZkappWorkerClient {


  // ---------------------------------------------------------------------------------------

  loadSnarkyJS() {
    return this._call('loadSnarkyJS', {});
  }

  setActiveInstanceToBerkeley() {
    return this._call('setActiveInstanceToBerkeley', {});
  }

  loadContract() {
    return this._call('loadContract', {});
  }

  compileContract() {
    return this._call('compileContract', {});
  }

  fetchAccount({ publicKey }: { publicKey: PublicKey }): ReturnType<typeof fetchAccount> {
    const result = this._call('fetchAccount', { publicKey58: publicKey.toBase58() });
    return (result as ReturnType<typeof fetchAccount>);
  }

  initZkappInstance(publicKey: PublicKey) {
    return this._call('initZkappInstance', { publicKey58: publicKey.toBase58() });
  }

  async getNumOfDocs(): Promise<Field> {
    const result = await this._call('getNumOfDocs', {});
    if (result) {
      return Field.fromJSON(JSON.parse(result as string));
    } else {
      return Field(0)
    }
  }

  async getRegistryHash(): Promise<Field> {
    const result = await this._call('getRegistryHash', {});
    console.log(result)
    if (result) {
      return Field.fromJSON(JSON.parse(result as string));
    } else {
      return Field(0)
    }
  }

  createUploadTxn(docHash: CircuitString, path: MyMerkleWitness) {
    return this._call('createUploadTransaction', { docHash, path });
  }

  proveUploadTxn() {
    return this._call('proveUploadTransaction', {});
  }

  async getUploadTxnJSON() {
    const result = await this._call('getUploadTransactionJSON', {});
    return result;
  }

  createVerifyTxn(docHash: CircuitString, path: MyMerkleWitness) {
    return this._call('createVerifyTransaction', { docHash, path });
  }

  proveVerifyTxn() {
    return this._call('proveVerifyTransaction', {});
  }

  async getVerifyTxnJSON() {
    const result = await this._call('getVerifyTransactionJSON', {});
    return result;
  }

  // ---------------------------------------------------------------------------------------

  worker: Worker;

  promises: { [id: number]: { resolve: (res: any) => void, reject: (err: any) => void } };

  nextId: number;

  constructor() {
    this.worker = new Worker(new URL('./zkappWorker.ts', import.meta.url))
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      this.promises[event.data.id].resolve(event.data.data);
      delete this.promises[event.data.id];
    };
  }

  _call(fn: WorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject }

      const message: ZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }
}

