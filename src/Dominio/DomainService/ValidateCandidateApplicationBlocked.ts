import { Candidate } from "../AggRoots/Candidate/Candidate";
import { CandidateStatesEnum, CandidateStateVo } from "../AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { Application } from "../AggRoots/Offer/Application/Application";
import { ApplicationStates } from "../AggRoots/Offer/Application/Value Objects/ApplicationStates";

export class ValidateCandidateApplicationBlocked{
    suspended: ApplicationStates;
    validate(candidate: Candidate, apply: Application[]){
        for (let applys of apply){
            if (applys.getCandidateId() === candidate.Id && candidate.state.state === CandidateStatesEnum.Suspended){
                applys.setState(ApplicationStates.Inactive);
            }
        }        
    }    
}