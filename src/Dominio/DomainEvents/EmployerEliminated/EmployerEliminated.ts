import { EmployerIdVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerIDVO";
import { EmployerStateVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVO";
import { IDomainEvent } from "../IDomainEvent";


export class EmployerEliminated implements IDomainEvent {
  public dateTimeOcurred: Date;
  public Employer: EmployerIdVO;
  public state: EmployerStateVo;

  constructor(Employer: EmployerIdVO, state: EmployerStateVo) {
    this.dateTimeOcurred = new Date(Date.now());
    this.Employer = Employer;
    this.state = state;
  }
}