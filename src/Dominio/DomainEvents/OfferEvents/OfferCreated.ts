import { PublicationDateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferLocationVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVo";
import { IDomainEvent } from "../IDomainEvent";

export class OfferCreated implements IDomainEvent {
    dateTimeOcurred: Date;

    public State: OfferStateVO;
    public PublicationDate: PublicationDateVO;
    public Rating: RatingVO;
    public Direction: OfferLocationVO;
    public Sector: SectorVO;
    public Budget: BudgetVO;
    public Description: DescriptionVO;

    constructor(
        State: OfferStateVO,
        PublicationDate: PublicationDateVO,
        Rating: RatingVO,
        Direction: OfferLocationVO,
        Sector: SectorVO,
        Budget: BudgetVO,
        Description: DescriptionVO,
    ) {
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
