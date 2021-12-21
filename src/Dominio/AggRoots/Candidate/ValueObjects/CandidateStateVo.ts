export class CandidateStateVo{
    state: CandidateStatesEnum;

    constructor(currentState: CandidateStatesEnum){
        this.state = currentState;
    }

    public static fromString(current: string): CandidateStateVo {
        

        if (!(current in CandidateStatesEnum)){
            throw new Error("State "+ current +" does not exist");
        }
        
        
        return new CandidateStateVo(CandidateStatesEnum[current]);
    }
}

export enum CandidateStatesEnum{
    Active,
    Suspended,
}
