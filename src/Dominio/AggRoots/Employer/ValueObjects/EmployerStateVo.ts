export class EmployerStateVo {
  current: EmployerStates;
  constructor(current: EmployerStates) {
    this.current = current;
  }
}

export enum EmployerStates {
  Active,
  Suspended,
  Eliminated,
}
