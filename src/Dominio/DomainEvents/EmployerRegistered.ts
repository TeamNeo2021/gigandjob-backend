import { IDomainEvent } from "./IDomainEvent";

export class EmployerRegistered implements IDomainEvent {
  public dateTimeOcurred: Date;

  public Name: string;
  public Description: string;
  public Location: EmployerLocationVO;
  public Rif: string;
  public Phone: string;
  public Mail: string;
  public ComDesignation: string;

  constructor(
    Name: string,
    Description: string,
    Location: EmployerLocationVO,
    Rif: string,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    this.dateTimeOcurred = new Date(Date.now());
    this.Name = Name;
    this.Description = Description;
    this.Location = Location;
    this.Rif = Rif;
    this.Phone = Phone;
    this.Mail = Mail;
    this.ComDesignation = ComDesignation;
  }
}
