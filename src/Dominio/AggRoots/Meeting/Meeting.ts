import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { MeetingIDVO } from './ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './ValueObjects/MeetingLocationVO';
import { MeetingStateVO } from './ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './ValueObjects/MeetingDateVO';
import { EmployerIdVO } from '../Employer/ValueObjects/EmployerIdVO';
import { CandidateIdVo } from '../Candidate/ValueObjects/CandidateIdVo';


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
        return this.candidate;
    }

    get employer(): EmployerIdVO{
        return this.employer;
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
        this.candidate = candidate;
    }

    set employer(employer: EmployerIdVO){
        this.employer = employer;
    }
}
