export class EmployerStateVO {
  value_state: EmployerStates;

  constructor(current: EmployerStates) {
    this.value_state = current;
  }
}

export enum EmployerStates {
  Active,
  Suspended,
  Eliminated,
}
