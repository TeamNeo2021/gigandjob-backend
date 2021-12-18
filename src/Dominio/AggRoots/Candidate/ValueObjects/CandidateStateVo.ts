export class CandidateStateVo{
    state: CandidateStatesEnum;

    constructor(currentState: CandidateStatesEnum){
        this.state = currentState;
    }
}

export enum CandidateStatesEnum{
    Active,
    Suspended,
}