import { IDomainEvent } from "../IDomainEvent";


export class CandidateApplied implements IDomainEvent{
    dateTimeOcurred: Date;

    CandidateId: string;
    OfferId: string;
    budget: number;
    description: string;
    time: number;

    constructor(
        CandidateId: string,
        OfferId: string,
        budget: number,
        description: string,
        time: number,
    ){
        this.dateTimeOcurred = new Date();
        this.CandidateId = CandidateId,
        this.OfferId = OfferId;
        this.budget = budget;
        this.description = description;
        this.time = time;
    }
}