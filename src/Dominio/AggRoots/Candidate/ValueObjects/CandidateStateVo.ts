export class CandidateStateVo{
    state: CandidateStatesEnum;

    constructor(currentState: CandidateStatesEnum, public readonly suspensionCount: number = 0){
        this.state = currentState;
    }

    public static fromString(current: string, suspensionCount: number = 0): CandidateStateVo {
        if (!(current in CandidateStatesEnum)){
            throw new Error("State "+ current +" does not exist");
        }

        const currentState = CandidateStatesEnum[current]
        
        return new CandidateStateVo(currentState, currentState == CandidateStatesEnum.Suspended ? suspensionCount + 1 : suspensionCount);
    }
}


export enum CandidateStatesEnum{
    Active,
    Suspended,
    Eliminated
}
