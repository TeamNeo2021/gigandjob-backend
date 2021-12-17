import { Entity } from "src/Dominio/Core/Entity";
import { CvAspirantApproved } from "src/Dominio/DomainEvents/CvAspirantApproved";
import { CvAspirantApprovedHandler } from "src/Dominio/DomainEvents/CvAspirantApprovedHandler";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateIdVO } from "./ValueObjects/CandidateIdVo";
import { CandidateStateVo } from "./ValueObjects/CandidateStateVo";

export class Candidate extends Entity<String> {
    private _id: CandidateIdVO;
    private _state: CandidateStateVo;
    private _name: CandidateFullNameVo;
    private _Cv:String;//Cambiar string por CV, tambien lo mismo con su get y set
 
    

    protected when(event: IDomainEvent) {
        throw new Error("Method not implemented.");
    }

    //comandos

    public approveCVAspirant(Cv:String){
        console.log("CV aprobado");
        this.apply(
            new CvAspirantApproved(Cv),
            new CvAspirantApprovedHandler()
        );
    }

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
    
    public get Cv() : String {
        return this.Cv;
    }
    
    public set Cv(Cv : String) {
        this.Cv = Cv;
    }
    
}