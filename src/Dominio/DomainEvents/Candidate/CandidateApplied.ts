import { ApplicationBudget } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationBudget";
import { ApplicationId } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationId";
import { ApplicationDescription } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationDescription";
import { ApplicationTime } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationTime";
import { IDomainEvent } from "../IDomainEvent";
import { ApplicationState } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates";

export class CandidateApplied implements IDomainEvent{
    dateTimeOcurred: Date;
    constructor(
        id: ApplicationId,
        budget: ApplicationBudget,
        state: ApplicationState,
        description: ApplicationDescription,
        time: ApplicationTime,
    ){
        this.dateTimeOcurred = new Date();
    }
}