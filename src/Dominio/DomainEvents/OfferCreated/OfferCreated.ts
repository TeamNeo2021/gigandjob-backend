import { Application } from "src/Dominio/AggRoots/Offer/Application/Application";
import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { SectorVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVO";
import { OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVO";
import { IDomainEvent } from "../IDomainEvent";

export class OfferCreated implements IDomainEvent {
    dateTimeOcurred: Date;

    /*public State: OfferStateVO;
    public PublicationDate: PublicationDateVO;
    public Rating: RatingVO;
    public Direction: DirectionVO;
    public Sector: SectorVO;
    //Sectors es el VO de sector en la entidad de offer
    public Budget: BudgetVO;
    public Description: DescriptionVO;*/

    public State: number;
    public PublicationDate: Date;
    public Rating: number;
    public Direction: string;
    public Sector: number;
    //Sectors es el VO de sector en la entidad de offer
    public Budget: number;
    public Description: string;
    public application: Application[];

    constructor(
        State: number,
        PublicationDate: Date,
        Rating: number,
        Direction: string,
        Sector: number,
        //Sectors es el VO de sector en la entidad de offer
        Budget: number,
        Description: string,
        application: Application[]
    ){
        this.dateTimeOcurred = new Date(Date.now());
        this.State = State;
        this.PublicationDate = PublicationDate;
        this.Rating = Rating;
        this.Direction = Direction;
        this.Sector = Sector;
        this.Budget = Budget;
        this.Description = Description;
        this.application = application;

    }


}