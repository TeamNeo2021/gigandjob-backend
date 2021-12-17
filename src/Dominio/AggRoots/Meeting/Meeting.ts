import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { MeetingIDVO } from './ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './ValueObjects/MeetingLocationVO';
import { MeetingStateVO } from './ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './ValueObjects/MeetingDateVO';


export class Meeting extends AggregateRoot{
 
    private _id: MeetingIDVO;
    private _state: MeetingStateVO;
    private _description: MeetingDescriptionVO;
    private _date: MeetingDateVO;
    private _location: MeetingLocationVO;
    
    constructor(id: string, state: MeetingStateVO, description: MeetingDescriptionVO, date: Date, location: string, applier: any) {
       super(applier); 
       this._id = new MeetingIDVO(id);
       this._state = state;
       this._description = description;
       this._date = new MeetingDateVO(date);
       this._location = new MeetingLocationVO();
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

    set state(state: MeetingStateVO){
        this._state = state;
    }

    set date(date: MeetingDateVO){
        this._date = date;
    }

    set location(location: MeetingLocationVO){
        this._location = location;
    }

    protected when(event: IDomainEvent, handler: IDomainEventHandler) {
        throw new Error('Method not implemented.');
    }
}
