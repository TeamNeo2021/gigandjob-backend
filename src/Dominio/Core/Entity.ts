import { IInternalEventHandler } from "../AggRoots/IInternalEventHandler";
import { EmployerRegisteredHandler } from "../DomainEvents/EmployerRegisteredHandler";
import { IDomainEvent } from "../DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "../DomainEvents/IDomainEventHandler";

export abstract class Entity<TId> implements IInternalEventHandler{

   
    private _guid: TId;
    //private readonly  _applier : Action<object>;
    private readonly  _applier : any;

    public get guid(): TId {
        return this._guid;
    }
    
    protected set guid(value: TId) {
        this._guid = value;
    }

    constructor(applier: any){
        this._applier = applier;
    }

    protected abstract when(event: IDomainEvent,  handler: IDomainEventHandler);
    
    protected apply(event:IDomainEvent, handler: IDomainEventHandler){
        this.when(event, handler);
        this._applier(event);
    }

    Handle(event: IDomainEvent, handler: IDomainEventHandler): void {
        this.when(event, handler);
    }

    
}

