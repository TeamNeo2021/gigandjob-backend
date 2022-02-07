import { CollectionReference } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { DashboardWebModelDTO } from "src/Application/DTO/QueryModel DTO's/dashboard_web.dto";
import { DashboardWebQueryModel } from "src/Application/QueryModels/DashboardWebQueryModel";



@Injectable()
export class DashboardWebQueryFirestoreAdapter
    implements DashboardWebQueryModel{

    constructor(@Inject('dashboardModel') private queryModel: CollectionReference<DashboardWebModelDTO>) {}

    async getModel(date: Date): Promise<DashboardWebModelDTO> {
        const query = await this.queryModel.where('date', '==', date).get();
        const result = query.docs[0].data();

        if (!result) return null

        const dashboardDTO = new DashboardWebModelDTO(
            result.meetings,
            result.employers,
            result.users
        );

        return dashboardDTO;
    }

}