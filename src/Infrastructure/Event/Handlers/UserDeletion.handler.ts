import { CollectionReference } from "@google-cloud/firestore";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MeetingDTO } from "src/Application/DTO/Meeting/Meeting.dto";
import { DashboardWebModelDTO } from "src/Application/DTO/QueryModel DTO's/dashboard_web.dto";
import { CandidateRegisteredDomainEvent } from "src/Dominio/DomainEvents/CandidateEvents/CandidateRegistered";
import { CandidateStateModified } from "src/Dominio/DomainEvents/CandidateEvents/CandidateStateModified";

@EventsHandler(CandidateRegisteredDomainEvent)
export class UserDeletionHandler implements IEventHandler<CandidateStateModified> {
    constructor(
        @Inject('meetings') private Meetingscollection: CollectionReference<MeetingDTO>,
        @Inject('dashboardModel') private DashboardCollection: CollectionReference<DashboardWebModelDTO>){}

    async handle(event: CandidateStateModified) {
        await this.updateReadSide();
    };

    async updateReadSide(): Promise<void>{

        let users: number;

        const sizeQuery = await this.Meetingscollection.get().then(snap =>
            users = snap.size
        )

        const updateQuery = await this.DashboardCollection.doc('N4apURXjdiD4jAkrzK79').update(
            {
                'users': users
            }        
        )
    };
}