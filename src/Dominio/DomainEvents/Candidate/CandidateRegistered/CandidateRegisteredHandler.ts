import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { IDomainEvent } from "../../IDomainEvent";
import { IDomainEventHandler } from "../../IDomainEventHandler";
import { CandidateRegisteredDomainEvent } from "./CandidateRegistered";

export class CandidateRegisteredHandler implements IDomainEventHandler{
    handle(event: CandidateRegisteredDomainEvent): void {
        console.log('Candidate registered has been handle, more info: ', event) ;   }

}