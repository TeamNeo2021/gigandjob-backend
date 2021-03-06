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

        //const clean_today = new Date(today.toDateString())

        const clean_today = today;
        clean_today.setHours(0,0,0,0)

        const late_today = new Date();

        late_today.setHours(23,59,58,50);
        
        console.log('clean_today', clean_today.toString())
        console.log('late_today', late_today.toString())
        const sizeQuery = await this.Meetingscollection
            .where('date', '>=', clean_today)
            .where('date', '<=', late_today)
            .get()
            .then(snap => 
                meetings = snap.size)

        
        console.log('meetings', meetings)
        const updateQuery = await this.DashboardCollection.doc('N4apURXjdiD4jAkrzK79').update(
            {
                'meetings': meetings
            }        
        )
    };
}