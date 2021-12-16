import { Entity } from "src/Dominio/Core/Entity";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";

export class Candidate extends Entity<String> {
    protected when(event: IDomainEvent) {
        throw new Error("Method not implemented.");
    }

  
}