import { CandidateBirthDateVo } from "./ValueObjects/CandidateBirthDateVo";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "./ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "./ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "./ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "./ValueObjects/CandidateEmailVo";
import {AggregateRoot} from '../AggregateRoot'
import { Cv } from "../CV/cv.root";
import { InvalidCandidateState } from "./ValueObjects/Errors/invalidCandidateState.error";
import { CandidateRegisteredDomainEvent } from "../../DomainEvents/Candidate/CandidateRegistered/CandidateRegistered";
import { CandidateStatesEnum, CandidateStateVo } from "./ValueObjects/CandidateStateVo";
import { CandidateStateModified } from "../../DomainEvents/Candidate/CandidateStateModified";
import { CvAspirantApproved } from "../../DomainEvents/Candidate/CvAspirantApproved";
import { IDomainEvent } from "../../DomainEvents/IDomainEvent";



export class Candidate extends AggregateRoot {
 
    private _id: CandidateIdVo;
    private _state: CandidateStateVo;
    private _name: CandidateFullNameVo;
    
    private _phone: CandidatePhoneVo;
    private _email: CandidateEmailVo;
    private _birthDate: CandidateBirthDateVo;
    private _location: CandidateLocationVo;
    private _Cv:Cv;

    constructor(
        id: CandidateIdVo,
        state: CandidateStateVo,
        name: CandidateFullNameVo,
        phone: CandidatePhoneVo,
        email: CandidateEmailVo,
        birthDate: CandidateBirthDateVo,
        location: CandidateLocationVo,
    ){ 
        super();
        this._id = id;
        this._state = state;
        this._name = name;
        this._phone = phone;
        this._birthDate = birthDate;
        this._email = email;
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

    public set phone(value: CandidatePhoneVo) { 
        this._phone = value;
    }

    public get email(): CandidateEmailVo{
        return this._email;
    }

    public get birthDay(): CandidateBirthDateVo{
        return this._birthDate;
    }

    public get location(): CandidateLocationVo {
        return this._location;
    }
    public set location(value: CandidateLocationVo) {
        this._location = value;
    }
       
    public get Cv() : Cv {
        return this._Cv;
    }
    
    public set Cv(Cv : Cv) {
        this._Cv = Cv;
    }


    protected EnsureValidState(): void {
    
        const valid =   (
        this._id != undefined 
        && this._state != undefined 
        && this._name != undefined
        && this._phone != undefined
        && this._email != undefined
        && this._birthDate != undefined);

        if(!valid){
            throw InvalidCandidateState.invalidCandidate;
        }

    }
   
    protected When(event: IDomainEvent): void {
        switch (event.constructor) {
            case CandidateStateModified:
                const eventCandidateStateModified:CandidateStateModified=event as CandidateStateModified;
                this._state = CandidateStateVo.fromString(eventCandidateStateModified.new_current)
                console.log('new state '
                            +eventCandidateStateModified.new_current 
                            +' applied to candidate '
                            +this._id)
                break;
            case CvAspirantApproved:
                const eventCvApproved:CvAspirantApproved=event as CvAspirantApproved;
                const sumb3=Cv.submitCv(eventCvApproved.Candidate._Cv.description,
                    eventCvApproved.Candidate._Cv.workExperiences,
                    eventCvApproved.Candidate._Cv.studies,
                    eventCvApproved.Candidate._Cv.photo,
                    eventCvApproved.Candidate._Cv.candidate,
                    eventCvApproved.Candidate._Cv.id);
                    this._Cv=sumb3.approve();
                    console.log('new state Cv '+this._Cv.state.toString()+' applied to candidate '+this._id.value)
            default:
                break;
        }
    }


    public registerCandidate(){
        console.log('Registering Candidate #: ', this._id,'\nName: ', this._name.fullName);
        this.Apply(new CandidateRegisteredDomainEvent(this));
        return this;
    }

    public eliminateThisCandidate(){
        console.log('Eliminating Candidate #: ', this._id,'\nName: ', this._name.fullName);
        this.Apply(new CandidateStateModified('Eliminate'))
    }

    public ApprovedCvCandidate(){
        console.log('The candidate"s CV: ', this._id,'\nName: ', this._name.fullName);
        this.Apply(new CvAspirantApproved(this));
        return this;
    }

}


