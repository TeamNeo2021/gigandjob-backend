import { AggregateRoot } from '../AggregateRoot';
import { MeetingIDVO } from './ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './ValueObjects/MeetingLocationVO';
import { MeetingStates, MeetingStateVO } from './ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './ValueObjects/MeetingDateVO';
import { EmployerIdVO } from '../Employer/ValueObjects/EmployerIdVO';
import { CandidateIdVo } from '../Candidate/ValueObjects/CandidateIdVo';
import { MeetingCanceledEvent } from '../../DomainEvents/MeetingEvents/MeetingCanceled.event';
import { MeetingScheduledEvent } from '../../DomainEvents/MeetingEvents/MeetingScheduled.event';
import { IDomainEvent } from '../../DomainEvents/IDomainEvent';
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
                const meetingCanceledEvent: MeetingCanceledEvent = event as MeetingCanceledEvent;
                this.state = (meetingCanceledEvent.state);
                if (today.LessThan(this.date)){
                    this.state = (meetingCanceledEvent.state);
                } else {
                    throw InvalidMeetingDate.MeetingDateExpired() ;
                }
                break;
            case MeetingScheduledEvent:
                const meetingScheduledEvent: MeetingScheduledEvent = event as MeetingScheduledEvent;
                this.state = (meetingScheduledEvent.state);
                this.date = (meetingScheduledEvent.date);
                this.description = (meetingScheduledEvent.description);
                this.location = (meetingScheduledEvent.location);
                this.employer = (meetingScheduledEvent.employer);
                this.candidate = (meetingScheduledEvent.candidate)
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

    static ScheduleOn(    
        date: MeetingDateVO,
        employer: EmployerIdVO,
        candidate: CandidateIdVo,
        description: MeetingDescriptionVO,
        location: MeetingLocationVO
        ){
            let activate = new MeetingStateVO(MeetingStates.Active)
            let id = new MeetingIDVO();
            let meeting = new Meeting(id, activate, description, date, location, employer, candidate);
            meeting.Apply(
                new MeetingScheduledEvent(id, date, employer, candidate, description, location, activate)
            );
            return meeting
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
    
    private set location(location: MeetingLocationVO){
        this._location = location;
    }

    private set description(description: MeetingDescriptionVO){
        this._description = description;
    }

    private set employer(employer: EmployerIdVO){
        this._employer = employer
    }

    private set candidate(candidate: CandidateIdVo){
        this._candidate = candidate
    }
}
