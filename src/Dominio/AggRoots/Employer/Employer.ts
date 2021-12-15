import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegisteredHandler } from '../../DomainEvents/EmployerRegisteredHandler';
import { EmployerRegistered } from '../../DomainEvents/EmployerRegistered';
import { EmployerNameVo } from './ValueObjects/EmployerNameVo';

export class Employer extends AggregateRoot implements IInternalEventHandler {
  private _Name: EmployerNameVo;
  private _Description: string;
  public get Description(): string {
    return this._Description;
  }
  public set Description(value: string) {
    this._Description = value;
  }
  private Location: string;
  private Rif: string;
  private Phone: string;
  private Mail: string;
  private ComDesignation: string;
  constructor() {
    super();
  }
  protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
    handler.handle(event, this);
  }
  protected EnsureValidState(): void {
    console.log('protected');
    console.log(this._Name);
    //throw new Error('Method not implemented.');
  }

  public RegistrarEmpleado(
    Name: string,
    Description: string,
    Location: string,
    Rif: string,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    console.log('RE');
    this.Apply(
      new EmployerRegistered(
        Name,
        Description,
        Location,
        Rif,
        Phone,
        Mail,
        ComDesignation,
      ),
      new EmployerRegisteredHandler(),
    );
  }

  public get Name(): EmployerNameVo {
    return this._Name;
  }
  public set Name(value: EmployerNameVo) {
    this._Name = value;
  }
}
