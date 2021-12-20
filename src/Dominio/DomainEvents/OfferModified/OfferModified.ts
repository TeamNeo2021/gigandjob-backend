import { Application } from "src/Dominio/AggRoots/Offer/Application/Application";
import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { PublicationDateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { SectorVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { IDomainEvent } from "../IDomainEvent";

export class OfferModified implements IDomainEvent {
    
    public dateTimeOcurred: Date;
        
    public state: OfferStateVO;
    public publicationDate: PublicationDateVO;
    public rating: RatingVO;
    public direction: DirectionVO;
    public sector: SectorVO;    
    public budget: BudgetVO;
    public description: DescriptionVO;
    public application: Application[];   
        
    
    constructor(
        state: OfferStateVO,
        publicationDate: PublicationDateVO,
        rating: RatingVO,
        direction: DirectionVO,
        sector: SectorVO,    
        budget: BudgetVO,
        description: DescriptionVO,
        application: Application[],
    ) {
        this.dateTimeOcurred = new Date(Date.now());
        this.state = state;
        this.publicationDate = publicationDate;
        this.rating = rating;
        this.direction = direction;
        this.sector = sector;    
        this.budget = budget;
        this.description = description;
        this.application = application;        
    }
}
