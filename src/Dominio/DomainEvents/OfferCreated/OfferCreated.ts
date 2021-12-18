import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVO";
import { OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVO";
import { IDomainEvent } from "../IDomainEvent";

export class OfferCreated implements IDomainEvent {
    dateTimeOcurred: Date;

    public State: OfferStateVO;
    public PublicationDate: PublicationDateVO;
    public Rating: RatingVO;
    public Direction: DirectionVO;
    public Sector: Sectors;
    //Sectors es el VO de sector en la entidad de offer
    public Budget: BudgetVO;
    public Description: DescriptionVO;

    constructor(
        State: OfferStateVO,
        PublicationDate: PublicationDateVO,
        Rating: RatingVO,
        Direction: DirectionVO,
        Sector: Sectors,
        //Sectors es el VO de sector en la entidad de offer
        Budget: BudgetVO,
        Description: DescriptionVO
    ){
        this.dateTimeOcurred = new Date(Date.now());
        this.State = State;
        this.PublicationDate = PublicationDate;
        this.Rating = Rating;
        this.Direction = Direction;
        this.Sector = Sector;
        this.Budget = Budget;
        this.Description = Description;

    }


}