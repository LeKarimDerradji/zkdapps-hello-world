import {
  Field,
  SmartContract,
  state,
  State,
  method,
  DeployArgs,
  Permissions,
  //AccountUpdate,
} from 'snarkyjs';

// How to create a smart contract.
export class Square extends SmartContract {
  // Creating an on-chain state of type Field, that is a number.
  @state(Field) num = State<Field>();

  // Deploy method
  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
    // Setting the num variable to 3
    this.num.set(Field(3));
  }

  // Method to update the number to its square, fails if it doesn't.
  @method update(square: Field) {
    const currentState = this.num.get();
    this.num.assertEquals(currentState);
    square.assertEquals(currentState.mul(currentState));
    this.num.set(square);
  }
}
