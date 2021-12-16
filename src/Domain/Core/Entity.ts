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

    protected abstract when(event: IDomainEvent);
    
    protected apply(event:IDomainEvent){
        this.when(event);
        this._applier(event);
    }

    Handle(event: IDomainEvent, handler: IDomainEventHandler): void {
        this.when(event);
    }

    
}

