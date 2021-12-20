import { throwError } from "rxjs";

export class CandidateStateVo{
    state: CandidateStatesEnum;
    isApproved: CandidateStatesEnum;

    constructor(currentState: CandidateStatesEnum, isApproved: CandidateStatesEnum){
        this.state = currentState;
        this.isApproved = isApproved;
    }

    public static fromString(current: string, isApprovedd: string): CandidateStateVo {
        

        if (!(current in CandidateStatesEnum)){
            throw new Error("State "+ current +" does not exist");
        }
        if (!(isApprovedd in CandidateStatesEnum)){
            throw new Error("State "+ isApprovedd +" does not exist");
        }
        
        return new CandidateStateVo(
            CandidateStatesEnum[current],
            CandidateStatesEnum[isApprovedd]);
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