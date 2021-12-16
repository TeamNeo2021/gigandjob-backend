import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot'


export class Meeting extends AggregateRoot implements IInternalEventHandler{
    private id: string;
    private state:string;
    private description:string;
    private date:Date;
    
    constructor(id: String, state: String, description: String, date: String) {
       super(); 
    }
    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler.handle(event, this);
    }
    protected EnsureValidState(): void {
        console.log("protected")
        throw new Error("Method not implemented.");
    }
}
