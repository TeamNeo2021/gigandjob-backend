export class MeetingStateVO {
  current: MeetingStates;
  constructor(currentState: MeetingStates) {
    this.current = currentState;
  }
}

export enum MeetingStates {
  Active,
  Suspended,
  Canceled,
  Pending,
}
