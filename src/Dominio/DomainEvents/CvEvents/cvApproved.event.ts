import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { CvId } from "../ValueObjects/cvId.object";

export class CvApprovedDomainEvent implements IDomainEvent {
    dateTimeOcurred: Date;

    constructor(public readonly id: CvId) { }
}
