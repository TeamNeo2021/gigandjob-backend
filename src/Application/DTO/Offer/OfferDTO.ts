import { ApplyToOfferDTO } from "../Application/ApplicationDTO.dto";
import { LocationDTO } from "../Location.dto";

export class OfferDTO {
  public  OfferId: string;
  public  State: string;
  public PublicationDate: Date;
  public  Rating: number;
  public Direction: LocationDTO;
  public  Sector: string;
  public  Budget: number;
  public  Description: string;
  public reports: { reporterId: string, reason: string }[];
  public applications: ApplyToOfferDTO[]
    
     constructor(offerData: any){
        this.OfferId = offerData.OfferId;
        this.State = offerData.State;
        this.PublicationDate = offerData.PublicationDate;
        this.Rating = offerData.Rating;
        this.Direction = new LocationDTO(offerData.Direction);
        this.Sector = offerData.Sector;
        this.Budget = offerData.Budget;
        this.Description = offerData.Description;
        this.reports = offerData.reports;
        this.applications = offerData.applications;
    }
}