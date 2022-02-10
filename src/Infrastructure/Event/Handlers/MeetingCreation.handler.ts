import { CollectionReference } from "@google-cloud/firestore";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MeetingDTO } from "src/Application/DTO/Meeting/Meeting.dto";
import { DashboardWebModelDTO } from "src/Application/DTO/QueryModel DTO's/dashboard_web.dto";

import { MeetingScheduledEvent } from "src/Dominio/DomainEvents/MeetingEvents/MeetingScheduled.event";

@EventsHandler(MeetingScheduledEvent)
export class MeetingCreationHandler implements IEventHandler<MeetingScheduledEvent> {
    constructor(
        @Inject('Meetings') private Meetingscollection: CollectionReference<MeetingDTO>,
        @Inject('dashboardModel') private DashboardCollection: CollectionReference<DashboardWebModelDTO>){}

    async handle(event: MeetingScheduledEvent) {
        await this.updateReadSide();
    };

    async updateReadSide(): Promise<void>{


        let meetings: number;

        const today = new Date();

        //const clean_today = new Date(today.getFullYear(),today.getMonth(), today.getDay());

        const clean_today = new Date(2022,2,9) 

        console.log('clean_today', clean_today)

        const query = await this.Meetingscollection
                            .where('date', '==', clean_today.getTime())
                            .get();
        
        const doc = query.docs[0]?.data()


        if (!doc) return null;

        console.log('doc', doc)

        // const updateQuery = await this.DashboardCollection.doc('N4apURXjdiD4jAkrzK79').update(
        //     {
        //         'meetings': meetings
        //     }        
        // )
    };
}