import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { EmployerPublisherEvent } from "./event";

export interface EmployerPublisher {
    publish(evts: EmployerPublisherEvent[])
}