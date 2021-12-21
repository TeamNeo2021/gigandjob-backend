import { Entity } from "../../Core/Entity";
import { CvAspirantApproved } from "../../DomainEvents/CvAspirantApproved";
import { CvAspirantApprovedHandler } from "../../DomainEvents/CvAspirantApprovedHandler";
import { IDomainEvent } from "../../DomainEvents/IDomainEvent";
import { CandidateBirthDateVo } from "./ValueObjects/CandidateBirthDateVo";
import { CandidateDescriptionVo } from "./ValueObjects/CandidateDescriptionVo";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "./ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "./ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "./ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "./ValueObjects/CandidateStateVo";
import { CandidateEmailVo } from "./ValueObjects/CandidateEmailVo";
import {AggregateRoot} from '../AggregateRoot'
import { IDomainEventHandler } from "../../DomainEvents/IDomainEventHandler";
import { ActivateCandidateDomainEvent } from "../../DomainEvents/Candidate/ActivateCandidate.event";
import { SuspendedCandidateDomainEvent } from "../../DomainEvents/Candidate/SuspendedCandidate.event";
import { OfferIdVO } from "../Offer/ValueObjects/OfferIdVO";
import { ApplicationId } from "../Offer/Application/Value Objects/ApplicationId";
import { MeetingIDVO } from "../Meeting/ValueObjects/MeetingIDVO";
import { Cv } from "../CV/cv.root";
import { InvalidCandidateState } from "./ValueObjects/Errors/invalidCandidateState.error";
import { CandidateRegisteredDomainEvent } from "../../DomainEvents/Candidate/CandidateRegistered/CandidateRegistered";
import { CandidateRegisteredHandler } from "../../DomainEvents/Candidate/CandidateRegistered/CandidateRegisteredHandler";
import { EliminateCandidateBeforeSuspentions } from "src/Dominio/DomainService/EliminateCandidateBeforeSuspentions";

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
       
    /*public get Cv() : String {
        return this._Cv;
    }
    
    public set Cv(Cv : String) {
        this._Cv = Cv;
    }*/


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
   
    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler?.handle(event,this)
    }

    
    /**
     * Use it in case of violating terms & conditions
     * Changes the state of an active Candidate to 'Suspended'
     * */

     public suspend(){ 
        let event = new SuspendedCandidateDomainEvent(this._id)
        const currentState = new CandidateStateVo(CandidateStatesEnum.Suspended);
        this._state = currentState;
        this.Apply(event, undefined)
        this.changes.push(event);
    }

    public registerCandidate(
        
    ){
        console.log('Registering Candidate #: ', this._id,'\nName: ', this._name.fullName);
        this.Apply(new CandidateRegisteredDomainEvent(this), new CandidateRegisteredHandler() );
        return this;
    }
    
    /**
     * Use it to reactivate a suspended candidate
     * Changes the state of an suspended Candidate to 'Active'
     * */

     public activate(){ 
            let event = new ActivateCandidateDomainEvent(this._id)
          const currentState = new CandidateStateVo(CandidateStatesEnum.Active);
          this._state = currentState;
          this.Apply(event, undefined)
          this.changes.push(event);
      }


      
    //comandos

    public approveCVAspirant(Cv:String){
        console.log("CV aprobado");
        this.Apply(
            new CvAspirantApproved(Cv),
            new CvAspirantApprovedHandler()
        );
    }



      /**
     * Use it to submit the CV from a candidate to review it
     *  returns CandidateCvSubmittedDomainEvent
     * */
     private submitCv(
          candidate_cv: Cv
      ){
        console.log('User finished and uploaded cv: CandidateCvSubmittedDomainService');
          console.log('CV: ', candidate_cv);
       }

        /**
     * Use it to change candidate's data
     *   returns CandidateProfileModifiedDomainEvent
     * */
       private  modifyProfile(
          user: Candidate
      ){ 
        console.log('new User Data', user);
        console.log('User modified its profile: CandidateProfileModifiedDomainService');
      }

       /**
     * takes the id from a given offer and creates a new Application for it
     * returns AppliedOfferDomainEvent
     * */
      private applyOffer(
          offer_id: OfferIdVO
      ){
            console.log('User applies to an offer, offer ID: ', offer_id);
            console.log('Creates a new application')
       }

        /**
     * removes the Application of candidate from a given offer
     * returns ApplicationRemovedDomainEvent
     * */
       private removeApplicationFromOffer(
        offer_id: OfferIdVO,
        application_id: ApplicationId
      ){
        console.log('User remove the application from an offer, offer ID: ', offer_id, 'application id:',application_id);
        console.log('The application has been removed');
      }

      /**
       * Candidate accepts the interview, meeeting is confirmed and both Emplyer and Candidate are notified
     * returns MeeetingAcceptedDomainEvent
     * */
      private acceptInterview(
          interview_id: MeetingIDVO
      ){ 
        console.log('User accepts the interview, id interview ', interview_id);
        console.log('The employer will be notified');
      }

      
      /**
       * Candidate reject the interview, meeeting is NOT confirmed and both Emplyer and Candidate are notified
     * returns MeeetingRejectedDomainEvent
     * */
      private rejectInterview(
          interview_id: MeetingIDVO
      ){ 
        console.log('User rejects the interview, id interview ', interview_id);
        console.log('The employer will be notified');
      }

      /**
       * Candidate cancels the interview for a given reason, meeeting is canceled and both Emplyer and Candidate are notified
     * returns MeeetingCanceledDomainEvent
     * */
      private  cancelInterview(
        interview_id: MeetingIDVO
    ){ 
      console.log('User cancels the interview, id interview ', interview_id);
      console.log('The employer will be notified');
    }
}


