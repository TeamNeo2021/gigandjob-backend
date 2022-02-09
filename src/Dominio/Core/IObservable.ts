import { IObserver } from './IObserver';

export interface IObservable {
  notifyAll(): void;
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
}
