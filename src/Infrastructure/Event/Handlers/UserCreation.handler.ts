import { CollectionReference } from "@google-cloud/firestore";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserApplicationService } from "src/Application/ApplicationServices/UserApplicationService.service";
import { DashboardWebModelDTO } from "src/Application/DTO/QueryModel DTO's/dashboard_web.dto";
import { CreateUserDTO } from "src/Application/DTO/User/CreateUser.dto";
import { UserDTO } from "src/Application/DTO/User/User.dto";
import { CandidateRegisteredDomainEvent } from "src/Dominio/DomainEvents/CandidateEvents/CandidateRegistered";


//This class listen the Nest EventBus and uses Firestore to update readside
@EventsHandler(CandidateRegisteredDomainEvent)
export class UserCreationHandler implements IEventHandler<CandidateRegisteredDomainEvent> {
    constructor(
        @Inject('UserService') private service: UserApplicationService,
        @Inject('users') private Usercollection: CollectionReference<UserDTO>,
        @Inject('dashboardModel') private DashboardCollection: CollectionReference<DashboardWebModelDTO>){}

    async handle(event: CandidateRegisteredDomainEvent) {
        await this.service.handle(new CreateUserDTO(
            event.candidate.id, 
            event.candidate.email.email.valueOf(), 
            event.password
        ));
        await this.updateReadSide();
    };

    async updateReadSide(): Promise<void>{

        let users: number;

        const sizeQuery = await this.Usercollection.get().then(snap =>
            users = snap.size
        )

        const updateQuery = await this.DashboardCollection.doc('N4apURXjdiD4jAkrzK79').update(
            {
                'users': users
            }        
        )
    };
}