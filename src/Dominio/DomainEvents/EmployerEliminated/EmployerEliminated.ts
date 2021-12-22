import { EmployerIdVO } from "../../AggRoots/Employer/ValueObjects/EmployerIDVO";
import { EmployerStateVO } from "../../AggRoots/Employer/ValueObjects/EmployerStateVO";
import { IDomainEvent } from "../IDomainEvent";


export class EmployerEliminated implements IDomainEvent {
  public dateTimeOcurred: Date;
  public Employer: EmployerIdVO;
  public state: EmployerStateVO;

  constructor(Employer: EmployerIdVO, state: EmployerStateVO) {
    this.dateTimeOcurred = new Date(Date.now());
    this.Employer = Employer;
    this.state = state;
  }
}