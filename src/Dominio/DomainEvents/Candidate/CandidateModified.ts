import { IDomainEvent } from "../IDomainEvent";
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateDescriptionVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateDescriptionVo";
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";

export class CandidateModified implements IDomainEvent {
    dateTimeOcurred: Date;
    _name: CandidateFullNameVo;
    _phone: CandidatePhoneVo;
    _mail: CandidateEmailVo;
    _birthDate: CandidateBirthDateVo;
    _description: CandidateDescriptionVo;
    _location: CandidateLocationVo;


    constructor(
        name: CandidateFullNameVo,
        phone: CandidatePhoneVo,
        mail: CandidateEmailVo,
        birthDate: CandidateBirthDateVo,
        description: CandidateDescriptionVo,
        location: CandidateLocationVo

    ){
        this._name = name;
        this._phone = phone;
        this._mail = mail;
        this._birthDate = birthDate;
        this._description = description;
        this._location = location;
        this.dateTimeOcurred = new Date();
    }

}
