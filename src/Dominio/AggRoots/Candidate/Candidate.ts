import { Entity } from "src/Dominio/Core/Entity";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateStateVo } from "./ValueObjects/CandidateStateVo";

export class Candidate extends Entity<String> {
    private _state: CandidateStateVo;
    private _name: CandidateFullNameVo;
 
    

    protected when(event: IDomainEvent) {
        throw new Error("Method not implemented.");
    }

    //getters and setters
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
}