import { IDomainEvent } from "../IDomainEvent";

export class CandidateSuspended implements IDomainEvent{
    dateTimeOcurred: Date;
}