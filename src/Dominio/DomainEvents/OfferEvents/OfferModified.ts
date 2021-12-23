import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVO";
import { OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVO";
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
    
    constructor(
        state: OfferStateVO,
        publicationDate: PublicationDateVO,
        rating: RatingVO,
        direction: DirectionVO,
        sector: SectorVO,    
        budget: BudgetVO,
        description: DescriptionVO,        
    ) {
        this.dateTimeOcurred = new Date(Date.now());
        this.state = state;
        this.publicationDate = publicationDate;
        this.rating = rating;
        this.direction = direction;
        this.sector = sector;    
        this.budget = budget;
        this.description = description;                
    }
}
