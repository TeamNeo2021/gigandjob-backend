import { CollectionReference } from "@google-cloud/firestore";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DashboardWebModelDTO } from "src/Application/DTO/QueryModel DTO's/dashboard_web.dto";
import { UserDTO } from "src/Application/DTO/User/User.dto";
import { CandidateRegisteredDomainEvent } from "src/Dominio/DomainEvents/CandidateEvents/CandidateRegistered";
import { CandidateStateModified } from "src/Dominio/DomainEvents/CandidateEvents/CandidateStateModified";

@EventsHandler(CandidateRegisteredDomainEvent)
export class UserDeletionHandler implements IEventHandler<CandidateStateModified> {
    constructor(
        @Inject('users') private Userscollection: CollectionReference<UserDTO>,
        @Inject('dashboardModel') private DashboardCollection: CollectionReference<DashboardWebModelDTO>){}

    async handle(event: CandidateStateModified) {
        await this.updateReadSide();
    };

    async updateReadSide(): Promise<void>{

        let users: number;

        const sizeQuery = await this.Userscollection.get().then(snap =>
            users = snap.size
        )

        const updateQuery = await this.DashboardCollection.doc('N4apURXjdiD4jAkrzK79').update(
            {
                'users': users
            }        
        )
    };
}