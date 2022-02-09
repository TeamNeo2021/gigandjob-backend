import { DashboardWebModelDTO } from "../DTO/QueryModel DTO's/dashboard_web.dto";

export interface DashboardWebQueryModel {
  getModel(date: Date): Promise<DashboardWebModelDTO>;
}
