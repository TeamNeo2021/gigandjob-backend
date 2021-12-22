import { AggregateRoot } from '../AggregateRoot';
import { MeetingIDVO } from './ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './ValueObjects/MeetingLocationVO';
import { MeetingStates, MeetingStateVO } from './ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './ValueObjects/MeetingDateVO';
import { EmployerIdVO } from '../Employer/ValueObjects/EmployerIdVO';
import { CandidateIdVo } from '../Candidate/ValueObjects/CandidateIdVo';
import { MeetingCanceledEvent } from 'src/Dominio/DomainEvents/MeetingEvents/MeetingCanceled.event';
import { MeetingScheduledEvent } from 'src/Dominio/DomainEvents/MeetingEvents/MeetingScheduled.event';
import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { InvalidMeetingDate } from './Errors/InvalidMeetingDate.error';


export class Meeting extends AggregateRoot{
    private _candidate: CandidateIdVo;
    private _employer: EmployerIdVO;
    private _id: MeetingIDVO;
    private _state: MeetingStateVO;
    private _description: MeetingDescriptionVO;
    private _date: MeetingDateVO;
    private _location: MeetingLocationVO;
    
    constructor(id: MeetingIDVO , state: MeetingStateVO, description: MeetingDescriptionVO, date: MeetingDateVO, location: MeetingLocationVO,
         employerID: EmployerIdVO, candidateID: CandidateIdVo) {
       super(); 
       this._id = id;
       this._state = state;
       this._description = description;
       this._date = date;
       this._location = location;
       this._employer = employerID;
       this._candidate = candidateID;
    }

    protected When(event: IDomainEvent): void {
        switch(event.constructor){
            case MeetingCanceledEvent:
                let today = new MeetingDateVO(new Date());
                let meetingCanceledEvent: MeetingCanceledEvent = event as MeetingCanceledEvent;
                if (this.date > today){
                    this.state = meetingCanceledEvent.state;
                } else {
                    throw InvalidMeetingDate.MeetingDateExpired() ;
                }
                break;
            case MeetingScheduledEvent:
                let meetingScheduledEvent: MeetingScheduledEvent = event as MeetingScheduledEvent;
                this.date = meetingScheduledEvent.appointment;
                break;
        }
    }

    protected EnsureValidState(): void {
        const valid = this._id != null        
        this._date != null &&
        this._location != null &&
        this._description != null &&
        this.candidate != null &&
        this.employer != null;
        switch (this.state.current) {
          case MeetingStates.Active:
              if (this._id == null ||        
                this._date == null ||
                this.date.value < new Date(Date.now()) ||
                this._location == null ||
                this._description == null ||
                this.candidate == null ||
                this.employer == null){
                  throw new Error("Invalid Active State");
              }
              break;
          case MeetingStates.Suspended:
            if (this._id == null ||        
                this._date == null ||
                this._location == null ||
                this._description == null ||
                this.candidate == null ||
                this.employer == null){
                  throw new Error("Invalid Suspended State");
              }     
          default:
              break;
      }

        if (!valid) {
          throw new Error('Verificacion de estado fallido');
        }
      }

    public Cancel(){
        let event = new MeetingCanceledEvent(this.id)
        this.Apply(event)
    }

    public ScheduleOn(date: Date){
        let event = new MeetingScheduledEvent(this.id, new MeetingDateVO(date))
        this.Apply(event)
    }

    // getters y setters
    get id(): MeetingIDVO{
        return this._id
    }

    get state(): MeetingStateVO{
        return this._state
    }

    get description(): MeetingDescriptionVO{
        return this._description
    }

    get date(): MeetingDateVO{
        return this._date
    }

    get location(): MeetingLocationVO{
        return this._location
    }

    get candidate(): CandidateIdVo{
        return this._candidate;
    }

    get employer(): EmployerIdVO{
        return this._employer;
    }

    private set state(state: MeetingStateVO){
        this._state = state;
    }

    private set date(date: MeetingDateVO){
        this._date = date;
    }
}
