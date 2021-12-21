import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateDescriptionVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateDescriptionVo";
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
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