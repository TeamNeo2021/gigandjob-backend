import { IObservable } from '../Core/IObservable';
import { IObserver } from '../Core/IObserver';
import { IDomainEvent } from '../DomainEvents/IDomainEvent';
import { IDomainEventHandler } from '../DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from './IInternalEventHandler';

export abstract class AggregateRoot implements IInternalEventHandler, IObservable {
  public tid: string;
  public observers: IObserver[] = [];
  protected readonly changes: IDomainEvent[] = [];
  protected abstract When(
    event: IDomainEvent,
    handler: IDomainEventHandler,
  ): void;
  protected abstract EnsureValidState(): void;
  public Apply(event: IDomainEvent, handler: IDomainEventHandler): void {
    this.When(event, handler);
    this.EnsureValidState();
    this.changes.push(event);
    this.notifyAll();

  }
  public GetChanges(): readonly object[] {
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


  //IObservable methods
  public notifyAll(): void{
    for (let observer of this.observers){
      observer.update();
    }
  }

  public addObserver(observer: IObserver): void {
      const isExist = this.observers.includes(observer);
      if (isExist) {
          return console.log('Observer has been added already.');
      }

      this.observers.push(observer);
      console.log('Added an observer.');
  }
  

  public removeObserver(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
        return console.log('Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Romoved an observer.');
  }

  public getObservers():IObserver[]{
    return this.observers;
  }
  
}
