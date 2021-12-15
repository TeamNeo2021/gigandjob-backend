import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegisteredHandler } from 'src/Dominio/DomainEvents/EmployerRegisteredHandler';
import { EmployerRegistered } from '../../DomainEvents/EmployerRegistered';

export class Employer extends AggregateRoot implements IInternalEventHandler {
  private Name: string;
  private Description: string;
  private Location: string;
  private Rif: string;
  private Phone: string;
  private Mail: string;
  private ComDesignation: string;
  constructor(parameters) {
    super();
  }
  protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
    handler.handle(event, this);
  }
  protected EnsureValidState(): void {
    console.log('protected');
    throw new Error('Method not implemented.');
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
}
