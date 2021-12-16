import { IDomainEvent } from '../DomainEvents/IDomainEvent';
import { IDomainEventHandler } from '../DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from './IInternalEventHandler';

export abstract class AggregateRoot implements IInternalEventHandler {
  public tid: string;
  private readonly changes: Array<object>;
  protected constructor() {
    this.changes = new Array<object>();
  }
  protected abstract When(
    event: IDomainEvent,
    handler: IDomainEventHandler,
  ): void;
  protected abstract EnsureValidState(): void;
  protected Apply(event: IDomainEvent, handler: IDomainEventHandler): void {
    this.When(event, handler);
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
  public Handle(event: IDomainEvent, handler: IDomainEventHandler): void {
    this.When(event, handler);
  }
}
