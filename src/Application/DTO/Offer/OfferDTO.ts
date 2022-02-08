import { Sectors } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { ApplicationDTO, ApplyToOfferDTO } from "../Application/ApplicationDTO.dto";
import { LocationDTO } from "../Location.dto";

type OfferDTOConstructorData = {
  OfferId: string,
  State: OfferStatesEnum,
  PublicationDate: Date,
  Rating: number,
  Direction: LocationDTO,
  Sector: Sectors,
  Budget: number, 
  Description: string,
  reports?: { reporterId: string, reason: string }[],
  applications?: ApplicationDTO[]
}

export class OfferDTO {
  public  OfferId: string;
  public  State: OfferStatesEnum;
  public PublicationDate: Date;
  public  Rating: number;
  public Direction: LocationDTO;
  public  Sector: Sectors;
  public  Budget: number;
  public  Description: string;
  public reports: { reporterId: string, reason: string }[];
  public applications: ApplicationDTO[]
    
     constructor(offerData: OfferDTOConstructorData){
        this.OfferId = offerData.OfferId;
        this.State = offerData.State;
        this.PublicationDate = offerData.PublicationDate;
        this.Rating = offerData.Rating;
        this.Direction = offerData.Direction;
        this.Sector = offerData.Sector;
        this.Budget = offerData.Budget;
        this.Description = offerData.Description;
        this.reports = offerData.reports || [];
        this.applications = offerData.applications || [];
    }
}