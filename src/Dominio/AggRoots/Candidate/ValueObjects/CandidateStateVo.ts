export class CandidateStateVo{
    state: CandidateStatesEnum;
    isApproved: CandidateStatesEnum;

    constructor(currentState: CandidateStatesEnum, isApproved: CandidateStatesEnum){
        this.state = currentState;
        this.isApproved = isApproved;
    }
}

export enum CandidateStatesEnum{
    Active,
    Suspended,
    Approbed,
    Unapproved,
    inReview,
    Eliminated
}