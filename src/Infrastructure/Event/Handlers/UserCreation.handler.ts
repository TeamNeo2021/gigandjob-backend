import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserApplicationService } from "src/Application/ApplicationServices/UserApplicationService.service";
import { CreateUserDTO } from "src/Application/DTO/User/CreateUser.dto";
import { CandidateRegisteredDomainEvent } from "src/Dominio/DomainEvents/CandidateEvents/CandidateRegistered";

@EventsHandler(CandidateRegisteredDomainEvent)
export class UserCreationHandler implements IEventHandler<CandidateRegisteredDomainEvent> {
    constructor(@Inject('UserService') private service: UserApplicationService) {}

    async handle(event: CandidateRegisteredDomainEvent) {
        await this.service.handle(new CreateUserDTO(
            event.candidate.id, 
            event.candidate.email.email.valueOf(), 
            event.password
        ))
    }
}