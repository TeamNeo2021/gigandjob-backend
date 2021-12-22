import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { Offer } from "../../AggRoots/Offer/Offer";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferIdVO } from "../../AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVO";
import { OfferStatesEnum, OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVO";
import { OfferModified } from "../../DomainEvents/OfferModified/OfferModified";
import { OfferCreated } from "../../DomainEvents/OfferCreated/OfferCreated";
import { randomUUID } from "crypto";

const registeringOfferEvent = ()=>{

    const exampleOffer = new Offer(
        new OfferIdVO(randomUUID()),
        new OfferStateVO(OfferStatesEnum.Active),
        new PublicationDateVO(new Date('1999-05-13')),
        new RatingVO(5),
        new DirectionVO("AV Casanova"),
        new SectorVO(Sectors.Technology),
        new BudgetVO(1000),
        new DescriptionVO("descripcion de prueba")
    );

    return exampleOffer.CreateOffer(
        new OfferStateVO(OfferStatesEnum.Active),
        new PublicationDateVO(new Date('200-01-31')),
        new RatingVO(7),
        new DirectionVO("AV Romulo Gallegos"),
        new SectorVO(Sectors.Technology),
        new BudgetVO(1500),
        new DescriptionVO("descripcion de prueba"),);
    
}

const exampleOffer = new Offer(
    new OfferIdVO(randomUUID()),
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date('1999-05-13')),
    new RatingVO(5),
    new DirectionVO("AV Casanova"),
    new SectorVO(Sectors.Technology),
    new BudgetVO(1000),
    new DescriptionVO("descripcion de prueba")
);
    
    describe("crear una oferta", ()=>{
    
        it("debe crear la oferta cuando se crea con un estado activa",()=>{        
            const offer = registeringOfferEvent();
            expect(offer .GetChanges()[0]).toBeInstanceOf(OfferCreated);
        })
    });
    
    describe("modificar una oferta", ()=>{
    
        it("no debe modificar la oferta cuando se modifica el estado de activo a cerrada sin aplicaciones",()=>{        
            expect(()=> exampleOffer.ModifyOffer(
                    new OfferStateVO(OfferStatesEnum.Closed),
                    new PublicationDateVO(new Date('200-01-31')),
                    new RatingVO(7),
                    new DirectionVO("AV Romulo Gallegos"),
                    new SectorVO(Sectors.Technology),
                    new BudgetVO(2000),
                    new DescriptionVO("descripcion de prueba"),)
            ).toThrowError(Error);
            console.log(exampleOffer._application.length);
        }),
        it("debe modificar la oferta cuando se modifica el estado de activa a suspendida",()=>{        
            exampleOffer.ModifyOffer(
                new OfferStateVO(OfferStatesEnum.Suspended),
                new PublicationDateVO(new Date('200-01-31')),
                new RatingVO(7),
                new DirectionVO("AV Romulo Gallegos"),
                new SectorVO(Sectors.Technology),
                new BudgetVO(2000),
                new DescriptionVO("descripcion de prueba"),);
            expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
            expect(exampleOffer.GetChanges()[1]).toBeInstanceOf(OfferModified);
            console.log(exampleOffer._application.length);
        }),
        it("no debe modificar la oferta cuando se modifica el estado de suspendida a cerrada",()=>{        
            expect(()=> exampleOffer.ModifyOffer(
                    new OfferStateVO(OfferStatesEnum.Closed),
                    new PublicationDateVO(new Date('200-01-31')),
                    new RatingVO(7),
                    new DirectionVO("AV Romulo Gallegos"),
                    new SectorVO(Sectors.Technology),
                    new BudgetVO(2000),
                    new DescriptionVO("descripcion de prueba"),)
            ).toThrowError(Error);
            console.log(exampleOffer._application.length);
        }),
        it("debe modificar la oferta cuando se modifica el estado de suspendida a activa",()=>{        
            exampleOffer.ModifyOffer(
                new OfferStateVO(OfferStatesEnum.Active),
                new PublicationDateVO(new Date('200-01-31')),
                new RatingVO(7),
                new DirectionVO("AV Romulo Gallegos"),
                new SectorVO(Sectors.Technology),
                new BudgetVO(2000),
                new DescriptionVO("descripcion de prueba"),);
            expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated)
            expect(exampleOffer.GetChanges()[1]).toBeInstanceOf(OfferModified)
            expect(exampleOffer.GetChanges()[2]).toBeInstanceOf(OfferModified)
            console.log(exampleOffer._application.length);       
        })
    })
    
