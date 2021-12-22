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
import { InvalidCandidateAction } from "./ValueObjects/Errors/invalidCandidateAction.error";



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
        location: CandidateLocationVo
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

 /**
     * Checks if the Candidate state is valid and throws error when not
     * @returns Void or InvalidCandidateState
     */
    protected EnsureValidState(): void {
    
        const notEmptyValues =   (
        this._id != undefined 
        && this._state != undefined 
        && this._name != undefined
        && this._phone != undefined
        && this._email != undefined
        && this._birthDate != undefined);

        const valid = notEmptyValues //&& anotherValidation && etc

        if(!valid){
            throw InvalidCandidateState.invalidCandidate;
        }

    }

    /**
     * -Candidate cannot be created with a Suspended value.
     * Validates the state given in the constructor is valid when is being registered
     * it will return true only when the candidate is being instantiated with an Active State
     * @returns Boolean
     */
    isStateValidOnRegister(){
       
         if( this._state.state != CandidateStatesEnum.Active){
           
            return false;
         }else{
            
             return true;
         }

    }

    /**
     * Candidate cannot be created twice.
     * Checks if CandidateRegister Domain Event is more thn once on the event list
     * @returns Boolean
     */
    isCandidateAlreadyRegistered(){
        console.log('# EVENTOS: ',this.GetChanges().length, 'lISTA: ', this.GetChanges())
        let counter = 0;
        this.GetChanges().forEach(event => {
           if(  event instanceof CandidateRegisteredDomainEvent){
               counter++;
           }
        });
        if(counter >= 1){
           
            return true;
        }else{
         
            return false;
        }
    }

    
      /**
    * @extends AggregateRoot.When
     * Checks the type of the Domain Event to proceed 
     * @returns Void
     */
    protected When(event: any): void {
        switch(event){
            case event as CandidateRegisteredDomainEvent:
                if(!this.isStateValidOnRegister()){
                    console.log('register with state not active: name: ', this._name.fullName);
                    throw InvalidCandidateState.candidateStateWhenRegistering()
                }
                if(this.isCandidateAlreadyRegistered()){
                    console.log('already registered ', this._name.fullName)
                    throw InvalidCandidateAction.alreadyRegistered()
                }
                break;
                default:
                    console.log('The event was not identified by Candidate')
                break;
        }
    }


       /**
     * Register a new Candidate 
     * @returns Candidate
     */
    public registerCandidate(
        
    ){
        console.log('Registering Candidate #: ', this._id,'\nName: ', this._name.fullName);
        this.Apply(new CandidateRegisteredDomainEvent(this));
        return this;
    }
    
}


