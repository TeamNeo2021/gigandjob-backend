import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerStates, EmployerStateVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { EmployerEliminated } from "./EmployerEliminated";

export class EmployerEliminatedHandler implements IDomainEventHandler {

  constructor() {
        
  }


  handle(event: EmployerEliminated, aggregate: Employer): void{
    if(aggregate.state.current == EmployerStates.Eliminated){
      throw new Error("The Employer is already Eliminated ");
    }
      
    aggregate.state = new EmployerStateVo(EmployerStates.Eliminated)
  }
}