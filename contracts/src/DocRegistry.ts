import {
  SmartContract,
  Poseidon,
  Field,
  Permissions,
  DeployArgs,
  State,
  state,
  method,
  MerkleWitness,
  Bool,
  CircuitString,
} from 'snarkyjs';

class MyMerkleWitness extends MerkleWitness(20) {}

let initialHash: Field = Field(0);

export class DocRegistry extends SmartContract {
  @state(Field) registryHash = State<Field>();
  @state(Field) noOfDocs = State<Field>();

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
      send: Permissions.proof(),
    });
    this.registryHash.set(initialHash);
  }

  @method uploadDoc(docHash: CircuitString, path: MyMerkleWitness) {
    const currRoot = this.registryHash.get();
    this.registryHash.assertEquals(currRoot);

    const noOfDocs = this.noOfDocs.get();
    this.noOfDocs.assertEquals(noOfDocs);

    const doc = Poseidon.hash(docHash.toFields());

    // ensure that path is empty
    const emptyDocRoot = path.calculateRoot(Field(0));

    currRoot.assertEquals(emptyDocRoot);

    // calculate root for document.
    const newDocRoot = path.calculateRoot(doc);

    // update root
    this.registryHash.set(newDocRoot);

    this.noOfDocs.set(noOfDocs.add(1));
  }

  @method verify(docHash: CircuitString, path: MyMerkleWitness): Bool {
    const currRoot = this.registryHash.get();
    this.registryHash.assertEquals(currRoot);

    const doc = Poseidon.hash(docHash.toFields());

    // check the initial state matches what we expect
    const docRoot = path.calculateRoot(doc);

    return docRoot.equals(currRoot);
  }
}
