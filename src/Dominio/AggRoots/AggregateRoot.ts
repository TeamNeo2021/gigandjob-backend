import { IObservable } from '../Core/IObservable';
import { IObserver } from '../Core/IObserver';
import { IDomainEvent } from '../DomainEvents/IDomainEvent';
import { IDomainEventHandler } from '../DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from './IInternalEventHandler';

export abstract class AggregateRoot implements IInternalEventHandler, IObservable {
  public tid: string;
  public observers: IObserver[] = [];
  protected readonly changes: IDomainEvent[] = [];
  
  protected abstract When(event: any): void;
  protected abstract EnsureValidState(): void;

  protected Apply(event: any): void {
    this.When(event);
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
    event: any
  ): void {
    entity.Handle(event);
  }

  public Handle(event: any): void {
    this.When(event);
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
