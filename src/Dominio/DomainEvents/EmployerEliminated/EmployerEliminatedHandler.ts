import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { EmployerEliminated } from "./EmployerEliminated";

export class EmployerEliminatedHandler implements IDomainEventHandler {
  handle(event: EmployerEliminated, aggregate: Employer): void{
    if(aggregate.State == event.state){
      aggregate.State = event.state;
    }
      
    else{
      throw new Error("The Employer cannot be Eliminated ");
    }
  }
}