import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { MeetingIDVO } from './ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './ValueObjects/MeetingLocationVO';
import { MeetingStates, MeetingStateVO } from './ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './ValueObjects/MeetingDateVO';
import { EmployerIdVO } from '../Employer/ValueObjects/EmployerIdVO';
import { CandidateIdVo } from '../Candidate/ValueObjects/CandidateIdVo';
import { MeetingCanceled } from 'src/Dominio/DomainEvents/MeetingCanceled/MeetingCanceled';
import { MeetingCanceledHandler } from 'src/Dominio/DomainEvents/MeetingCanceled/MeetingCanceledHandler';
import { MeetingScheduled } from 'src/Dominio/DomainEvents/MeetingScheduled/MeetingScheduled';
import { MeetingScheduledHandler } from 'src/Dominio/DomainEvents/MeetingScheduled/MeetingScheduledHandler';


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

    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler.handle(event, this);
    }

    protected EnsureValidState(): void {
        console.log("protected")
        throw new Error("Method not implemented.");
    }

    public Cancel(meetingId: MeetingIDVO, state: MeetingStateVO){
        console.log('Meeting canceled');
        this.Apply(new MeetingCanceled(meetingId, state),new MeetingCanceledHandler())
    }

    public Schedule(meetingId: MeetingIDVO, date: Date){
        console.log('Scheduled Meeting');
        this.Apply(new MeetingScheduled(meetingId, new MeetingDateVO(date)), new MeetingScheduledHandler())
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

    set state(state: MeetingStateVO){
        this._state = state;
    }

    set date(date: MeetingDateVO){
        this._date = date;
    }

    set location(location: MeetingLocationVO){
        this._location = location;
    }

    set candidate(candidate: CandidateIdVo){
        this._candidate = candidate;
    }

    set employer(employer: EmployerIdVO){
        this._employer = employer;
    }
}
