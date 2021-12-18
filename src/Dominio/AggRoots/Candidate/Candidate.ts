import { Entity } from "src/Dominio/Core/Entity";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { CandidateBirthDateVo } from "./ValueObjects/CandidateBirthDateVo";
import { CandidateDescriptionVo } from "./ValueObjects/CandidateDescriptionVo";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "./ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "./ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "./ValueObjects/CandidatePhoneVo";
import { CandidateStateVo } from "./ValueObjects/CandidateStateVo";
import { CandidateEmailVo } from "./ValueObjects/CandidateEmailVo";
import {AggregateRoot} from '../AggregateRoot'
import { IDomainEventHandler } from "src/Dominio/DomainEvents/IDomainEventHandler";

export class Candidate extends AggregateRoot {
 
    private _id: CandidateIdVo;
    private _state: CandidateStateVo;
    private _name: CandidateFullNameVo;
    private _phone: CandidatePhoneVo;
    private _email: CandidateEmailVo;
    private _birthDate: CandidateBirthDateVo;
    private _description: CandidateDescriptionVo;
    private _location: CandidateLocationVo;

    constructor(
        id: CandidateIdVo,
        state: CandidateStateVo,
        name: CandidateFullNameVo,
        phone: CandidatePhoneVo,
        email: CandidateEmailVo,
        birthDate: CandidateBirthDateVo,
        //description: CandidateDescriptionVo,
        location: CandidateLocationVo
    ){ 
        super();
        this._id = id;
        this._state = state;
        this._name = name;
        this._phone = phone;
        this._birthDate = birthDate;
        //this._description = description;
        this._location = location;

    }

    


    //getters and setters

    public get Id(): CandidateIdVo {
        return this._id;
    } 
    public get state(): CandidateStateVo {
        return this._state;
    }
    public set state(value: CandidateStateVo) {
        this._state = value;
    }
    public get name(): CandidateFullNameVo {
        return this._name;
    }
    public set name(value: CandidateFullNameVo) {
        this._name = value;
    }
    public get phone(): CandidatePhoneVo{
        return this._phone;
    }

    public get email(): CandidateEmailVo{
        return this._email;
    }

    public get birthDay(): CandidateBirthDateVo{
        return this._birthDate;
    }

    public get description(): CandidateDescriptionVo{
        return this._description;
    }

    public get location(): CandidateLocationVo {
        return this._location;
    }
    public set location(value: CandidateLocationVo) {
        this._location = value;
    }

    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        throw new Error("Method not implemented.");
    }
    protected EnsureValidState(): void {
        throw new Error("Method not implemented.");
    }
 
}