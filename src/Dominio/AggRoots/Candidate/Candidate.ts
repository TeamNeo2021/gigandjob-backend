import { CandidateBirthDateVo } from "./ValueObjects/CandidateBirthDateVo";
import { CandidateFullNameVo } from "./ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "./ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "./ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "./ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "./ValueObjects/CandidateEmailVo";
import { AggregateRoot } from '../AggregateRoot'
import { Cv } from "../CV/cv.root";
import { InvalidCandidateState } from "./ValueObjects/Errors/invalidCandidateState.error";
import { CandidateRegisteredDomainEvent } from "../../DomainEvents/Candidate/CandidateRegistered/CandidateRegistered";
import { CandidateStatesEnum, CandidateStateVo } from "./ValueObjects/CandidateStateVo";
import { CandidateStateModified } from "../../DomainEvents/Candidate/CandidateStateModified";
import { InvalidCandidateAction } from "./ValueObjects/Errors/invalidCandidateAction.error";
import { SuspendedCandidateDomainEvent } from "src/Dominio/DomainEvents/Candidate/SuspendedCandidate.event";
import { ActivateCandidateDomainEvent } from "src/Dominio/DomainEvents/Candidate/ActivateCandidate.event";
import { CvAspirantApproved } from "src/Dominio/DomainEvents/CvAspirantApproved";
import { CvSubmittedDomainEvent } from "src/Dominio/DomainEvents/CvEvents/cvSubmitted.event";
import { CandidateModified } from "src/Dominio/DomainEvents/Candidate/CandidateModified";
import { OfferIdVO } from "../Offer/ValueObjects/OfferIdVO";
import { CandidateApplied } from "src/Dominio/DomainEvents/Candidate/CandidateApplied";
import { ApplicationId } from "../Offer/Application/Value Objects/ApplicationId";
import { MeetingIDVO } from "../Meeting/ValueObjects/MeetingIDVO";




export class Candidate extends AggregateRoot {

    private _id: CandidateIdVo;
    private _state: CandidateStateVo;
    private _name: CandidateFullNameVo;

    private _phone: CandidatePhoneVo;
    private _email: CandidateEmailVo;
    private _birthDate: CandidateBirthDateVo;
    private _location: CandidateLocationVo;
    private _Cv: Cv;

    constructor(
        id: CandidateIdVo,
        state: CandidateStateVo,
        name: CandidateFullNameVo,
        phone: CandidatePhoneVo,
        email: CandidateEmailVo,
        birthDate: CandidateBirthDateVo,
        location: CandidateLocationVo
    ) {
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
    public get phone(): CandidatePhoneVo {
        return this._phone;
    }

    public set phone(value: CandidatePhoneVo) {
        this._phone = value;
    }

    public get email(): CandidateEmailVo {
        return this._email;
    }

    public get birthDay(): CandidateBirthDateVo {
        return this._birthDate;
    }

    public get location(): CandidateLocationVo {
        return this._location;
    }
    public set location(value: CandidateLocationVo) {
        this._location = value;
    }

    public get Cv(): Cv {
        return this._Cv;
    }

    public set Cv(Cv: Cv) {
        this._Cv = Cv;
    }

    /**
        * Checks if the Candidate state is valid and throws error when not
        * @returns Void or InvalidCandidateState
        */
    protected EnsureValidState(): void {

        const notEmptyValues = (
            this._id != undefined
            && this._state != undefined
            && this._name != undefined
            && this._phone != undefined
            && this._email != undefined
            && this._birthDate != undefined);

        const valid = notEmptyValues //&& anotherValidation && etc

        if (!valid) {
            throw InvalidCandidateState.invalidCandidate;
        }

    }

    /**
     * -Candidate cannot be created with a Suspended value.
     * Validates the state given in the constructor is valid when is being registered
     * it will return true only when the candidate is being instantiated with an Active State
     * @returns Boolean
     */
    isStateValidOnRegister() {

        if (this._state.state != CandidateStatesEnum.Active) {

            return false;
        } else {

            return true;
        }

    }

    /**
     * Candidate cannot be created twice.
     * Checks if CandidateRegister Domain Event is more thn once on the event list
     * @returns Boolean
     */
    isCandidateAlreadyRegistered() {
        console.log('# EVENTOS: ', this.GetChanges().length, 'lISTA: ', this.GetChanges())
        let counter = 0;
        this.GetChanges().forEach(event => {
            if (event instanceof CandidateRegisteredDomainEvent) {
                counter++;
            }
        });
        if (counter >= 1) {

            return true;
        } else {

            return false;
        }
    }


    /**
  * @extends AggregateRoot.When
   * Checks the type of the Domain Event to proceed 
   * @returns Void
   */
    protected When(event: any): void {
        switch (event) {

            case event as CandidateRegisteredDomainEvent:
                if (!this.isStateValidOnRegister()) {
                    console.log('register with state not active: name: ', this._name.fullName);
                    throw InvalidCandidateState.candidateStateWhenRegistering()
                }
                if (this.isCandidateAlreadyRegistered()) {
                    console.log('already registered ', this._name.fullName)
                    throw InvalidCandidateAction.alreadyRegistered()
                }
                break;
            case event as CandidateStateModified:
                this._state = CandidateStateVo.fromString(event.new_current)
                console.log('new state '
                    + event.new_current
                    + ' applied to candidate '
                    + this._id)
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

    ) {
        console.log('Registering Candidate #: ', this._id, '\nName: ', this._name.fullName);
        this.Apply(new CandidateRegisteredDomainEvent(this));
        return this;
    }

    public eliminateThisCandidate() {
        console.log('Eliminating Candidate #: ', this._id, '\nName: ', this._name.fullName);
        this.Apply(new CandidateStateModified('Eliminate'))
    }

    
    
    /**
     * Use it in case of violating terms & conditions
     * Changes the state of an active Candidate to 'Suspended'
     * */

     public suspend(){ 
        console.log(' Candidate suspended #: ', this._id, '\nName: ', this._name.fullName);
        let event = new SuspendedCandidateDomainEvent(this._id)
        this.Apply(event)
        return event;
    }

    /**
     * Use it to reactivate a suspended candidate
     * Changes the state of an suspended Candidate to 'Active'
     * */

     public activate(){ 
        console.log(' Candidate activated #: ', this._id, '\nName: ', this._name.fullName);
        let event = new ActivateCandidateDomainEvent(this._id)
          this.Apply(event)
          return event;
      
      }


      
       /**
     * Access point to approve a CV
     * */

    public approveCVAspirant(){
        console.log(' Cv approved Candidate id#: ', this._id, '\nName: ', this._name.fullName);
        //let event = this.Cv.approve(); //Esto esta dando error por un tema del CV y el tipo parametrizado
        this.Apply(
           event
        );
        return event;
    }



      /**
     * CV Acess point
     * Use it to submit the CV from a candidate to review it
     *  @returns CandidateCvSubmittedDomainEvent
     * */
     private submitCv(
          candidate_cv: Cv
      ){
        console.log('User finished and uploaded cv: CandidateCvSubmittedDomainService');
          console.log('CV: ', candidate_cv);
          //let event= this._Cv.submitCV();  El metodo submitCv de CV es static se debe arreglar
          //return event;
       }

        /**
     * Use it to change candidate's data
     *   @returns CandidateProfileModifiedDomainEvent
     * */
       private  modifyProfile(
        name: CandidateFullNameVo,
        phone: CandidatePhoneVo,
        email: CandidateEmailVo,
        birthDate: CandidateBirthDateVo,
        location: CandidateLocationVo
      ){ 
        console.log(' Candidate mofified #: ', this._id);
        let event = new CandidateModified(
            name, phone, email, birthDate, location
        )
        this.Apply(event)
        return event;
      }

       /**
     * takes the id from a given offer and creates a new Application for it
     * @returns AppliedOfferDomainEvent
     * */
      private applyToOffer(
          offer_id: OfferIdVO
      ){
            console.log('Candidate applies to an offer, offer ID: ', offer_id);
            console.log(' Candidate id#: ', this._id, '\nName: ', this._name.fullName);
            //Domain service CandidateAppliesOffer
       }

        /**
     * removes the Application of candidate from a given offer
     * @returns ApplicationRemovedDomainEvent
     * */
       private removeApplicationFromOffer(
        offer_id: OfferIdVO,
        application_id: ApplicationId
      ){
        console.log('User remove the application from an offer, offer ID: ', offer_id, 'application id:',application_id);
        console.log('The application has been removed');
        //Domain service RemoveApplicationFromOffer
      }

      /**
       * Candidate accepts the interview, meeeting is confirmed and both Emplyer and Candidate are notified
     * @returns MeeetingAcceptedDomainEvent
     * */
      private acceptInterview(
          interview_id: MeetingIDVO
      ){ 
        console.log('Candidate id#',this._id,' accepts the interview, id interview ', interview_id);
        console.log('The employer will be notified');
        //Domain Service Accepts Interview
      }

      
      /**
       * Candidate reject the interview, meeeting is NOT confirmed and both Emplyer and Candidate are notified
     * returns MeeetingRejectedDomainEvent
     * */
      private rejectInterview(
          interview_id: MeetingIDVO
      ){ 
        console.log('Candidate id#',this._id,' rejects the interview, id interview ', interview_id);
        console.log('The employer will be notified');
        //Domain Service Rejects Interview
      }

      /**
       * Candidate cancels the interview for a given reason, meeeting is canceled and both Emplyer and Candidate are notified
     * returns MeeetingCanceledDomainEvent
     * */
      private  cancelInterview(
        interview_id: MeetingIDVO
    ){ 
        console.log('Candidate id#',this._id,' cancels the interview, id interview ', interview_id);
        console.log('The employer will be notified');
        //Domain Service Cancels Interview
    }

}


