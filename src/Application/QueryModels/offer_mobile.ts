import { OfferDTO } from '../DTO/Offer/OfferDTO';
import { DashboardWebModelDTO } from "../DTO/QueryModel DTO's/dashboard_web.dto";

export interface OfferMobileQueryModel {
  getAll(): Promise<OfferDTO[]>;
}
