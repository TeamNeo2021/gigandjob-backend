import { DashboardWebModelDTO } from "../DTO/QueryModel DTO's/dashboard_web.dto";

export interface DashboardWebQueryModel {
    getModel(): Promise<DashboardWebModelDTO>
}