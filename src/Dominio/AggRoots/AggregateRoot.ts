import { Entity } from '../Core/Entity';
import { IDomainEvent } from '../DomainEvents/IDomainEvent';
import { IDomainEventHandler } from '../DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from './IInternalEventHandler';

export abstract class AggregateRoot extends Entity<String>   {
 
  private readonly changes: Array<object>;
  protected constructor(applier: any) {
    super(applier);
    this.changes = new Array<object>();
  }


  protected abstract EnsureValidState(): void;

  protected Apply(event: IDomainEvent, handler: IDomainEventHandler): void {
    this.when(event, handler);
    this.EnsureValidState();
    this.changes.push(event);
  }
  public GetChanges() {
    return this.changes;
  }
  public ClearChanges(): void {
    this.changes.splice(0, this.changes.length);
  }
  protected ApplyToEntity(
    entity: IInternalEventHandler,
    event: IDomainEvent,
    handler: IDomainEventHandler,
  ): void {
    entity.Handle(event, handler);
  }

}
