import { CollectionReference } from "@google-cloud/firestore";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EmployerDTO } from "src/Application/DTO/Employer/Employer.dto";
import { DashboardWebModelDTO } from "src/Application/DTO/QueryModel DTO's/dashboard_web.dto";
import { EmployerRegistered } from "src/Dominio/DomainEvents/EmployerEvents/EmployerRegistered";

@EventsHandler(EmployerRegistered)
export class EmployerCreationHandler implements IEventHandler<EmployerRegistered> {

    constructor(
        @Inject('employers') private Employerscollection: CollectionReference<EmployerDTO>,
        @Inject('dashboardModel') private DashboardCollection: CollectionReference<DashboardWebModelDTO>){}

    async handle(event: EmployerRegistered) {
       await this.updateReadSide();
    }

    async updateReadSide():Promise<void>{
        let employers:number;

        const sizeQuery = await this.Employerscollection
                            .where('state','==',0)
                            .get()
                            .then(snap =>
            employers = snap.size
        )
        console.log('employers', employers)
        const updateQuery = await this.DashboardCollection.doc('N4apURXjdiD4jAkrzK79').update(
            {
                'employers': employers
            }        
        )
    };
    
}