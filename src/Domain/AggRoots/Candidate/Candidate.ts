import { Entity } from "src/Domain/Core/Entity";
import { IDomainEvent } from "src/Domain/DomainEvents/IDomainEvent";

export class Candidate extends Entity<String> {
    protected when(event: IDomainEvent) {
        throw new Error("Method not implemented.");
    }

  
}