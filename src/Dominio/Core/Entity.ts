import { IInternalEventHandler } from "../AggRoots/IInternalEventHandler";
import { IDomainEvent } from "../DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "../DomainEvents/IDomainEventHandler";


type Publisher = (arg: IDomainEvent) => void;
export abstract class Entity<TId> implements IInternalEventHandler {

    private _guid: TId;
    private readonly _applier: Publisher;

    public get guid(): TId {
        return this._guid;
    }

    protected set guid(value: TId) {
        this._guid = value;
    }

    constructor(applier: any) {
        this._applier = applier;
    }

    protected abstract when(event: IDomainEvent, handler: IDomainEventHandler);

    protected apply(event: IDomainEvent, handler: IDomainEventHandler) {
        this.when(event, handler);
        this._applier(event);
    }

    Handle(event: IDomainEvent, handler: IDomainEventHandler): void {
        this.when(event, handler);
    }


}

