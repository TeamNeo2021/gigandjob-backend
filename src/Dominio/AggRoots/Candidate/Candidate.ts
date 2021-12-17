import { Entity } from "src/Dominio/Core/Entity";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "src/Dominio/DomainEvents/IDomainEventHandler";
import { AggregateRoot } from "../AggregateRoot";
import { CandidateBirthDateVo } from "./ValueObjects/CandidateBirthDateVo";
import { CandidateDescriptionVo } from "./ValueObjects/CandidateDescriptionVo";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateIdVO } from "./ValueObjects/CandidateIdVo";
import { CandidateMailVo } from "./ValueObjects/CandidateMailVo";
import { CandidatePhoneVo } from "./ValueObjects/CandidatePhoneVo";
import { CandidateStateVo } from "./ValueObjects/CandidateStateVo";

export class Candidate extends AggregateRoot{

 
    private _id: CandidateIdVO;
    private _state: CandidateStateVo;
    private _name: CandidateFullNameVo;
    private _phone: CandidatePhoneVo;
    private _mail: CandidateMailVo;
    private _birthDate: CandidateBirthDateVo;
    private _description: CandidateDescriptionVo;
 
    

  
    //getters and setters

    public get Id(): CandidateIdVO {
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

    public get mail(): CandidateMailVo{
        return this._mail;
    }

    public get birthDay(): CandidateBirthDateVo{
        return this._birthDate;
    }

    public get description(): CandidateDescriptionVo{
        return this._description;
    }

    //Agg root methods
    protected when(event: IDomainEvent, handler: IDomainEventHandler): void {
        throw new Error("Method not implemented.");
    }
    protected EnsureValidState(): void {
        throw new Error("Method not implemented.");
    }
}