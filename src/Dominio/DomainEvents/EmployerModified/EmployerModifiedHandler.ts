import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { EmployerModified } from "./EmployerModified";

export class EmployerModifiedHandler implements IDomainEventHandler {
    handle(event: EmployerModified, entity: Employer): void {
      entity.name = event.name;
      entity.description = event.description;
      entity.state = event.state;
      entity.location = event.location;
      entity.rif = event.rif;
      entity.phone = event.phone;
      entity.mail = event.mail;
      entity.comDesignation = event.comDesignation;

    }
  }