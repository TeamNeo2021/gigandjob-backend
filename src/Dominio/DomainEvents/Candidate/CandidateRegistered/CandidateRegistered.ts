import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { IDomainEvent } from "../../IDomainEvent";

export class CandidateRegisteredDomainEvent implements IDomainEvent{
    dateTimeOcurred: Date;

    constructor(
        // public readonly id: CandidateIdVo,
        // public readonly name: CandidateFullNameVo,
        // public readonly state: CandidateStateVo,
        // public readonly phone: CandidatePhoneVo,
        // public readonly mail: CandidateEmailVo,
        // public readonly birthDate: CandidateBirthDateVo,
        // public readonly location: CandidateLocationVo
        public readonly candidate: Candidate

    ){
        this.dateTimeOcurred = new Date();
        console.log('DomainEvent: Se ha registrado el candidato: ', candidate.Id)
        console.log('Registrado en: ', this.dateTimeOcurred)
    }
    
}