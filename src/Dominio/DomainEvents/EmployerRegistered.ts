import { IDomainEvent } from './IDomainEvent';

export class EmployerRegistered implements IDomainEvent {
  public dateTimeOcurred: Date;

  public Name: string;
  public Description: string;
  public State: number;
  public Location: string;
  public Rif: EmployerRifVO;
  public Phone: string;
  public Mail: string;
  public ComDesignation: string;

  constructor(
    Name: string,
    Description: string,
    State: number,
    Location: string,
    Rif: EmployerRifVO,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    this.dateTimeOcurred = new Date(Date.now());
    this.Name = Name;
    this.Description = Description;
    this.State = State;
    this.Location = Location;
    this.Rif = Rif;
    this.Phone = Phone;
    this.Mail = Mail;
    this.ComDesignation = ComDesignation;
  }
}
