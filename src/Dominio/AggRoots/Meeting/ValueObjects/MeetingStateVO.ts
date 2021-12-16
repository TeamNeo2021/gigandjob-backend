export class MeetingStateVO {
    current: MeetingStates;
    constructor() {
        this.current = MeetingStates.Active;
    }

}

export enum MeetingStates {
    Active,
    Suspended,
  }