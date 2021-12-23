import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { Offer } from "../../AggRoots/Offer/Offer";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVO";
import { OfferStatesEnum, OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVO";
import { OfferModified } from "../../DomainEvents/OfferEvents/OfferModified";
import { OfferCreated } from "../../DomainEvents/OfferEvents/OfferCreated";

const exampleOffer = Offer.CreateOffer(
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date('1999-05-13')),
    new RatingVO(5),
    new DirectionVO("AV Francisco de Miranda"),
    new SectorVO(Sectors.Technology),
    new BudgetVO(1500),
    new DescriptionVO("descripcion de prueba"),);;

    
    describe("crear una oferta", ()=>{
    
        it("debe crear la oferta cuando se crea con un estado activa",()=>{           
            expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
        })
    });
    
    describe("modificar una oferta", ()=>{
    
        it("no debe modificar la oferta cuando se cambia el estado de activo a cerrada sin aplicaciones",()=>{        
            expect(()=> exampleOffer.ModifyOffer(
                    new OfferStateVO(OfferStatesEnum.Closed),
                    new PublicationDateVO(new Date('2000-01-31')),
                    new RatingVO(7),
                    new DirectionVO("AV Romulo Gallegos"),
                    new SectorVO(Sectors.Technology),
                    new BudgetVO(2000),
                    new DescriptionVO("descripcion de prueba"),)
            ).toThrowError(Error);            
        }),
        it("debe modificar la oferta cuando se cambia el estado de activa a suspendida",()=>{        
            exampleOffer.ModifyOffer(
                new OfferStateVO(OfferStatesEnum.Suspended),
                new PublicationDateVO(new Date('2000-01-31')),
                new RatingVO(7),
                new DirectionVO("AV Romulo Gallegos"),
                new SectorVO(Sectors.Technology),
                new BudgetVO(2000),
                new DescriptionVO("descripcion de prueba"),);
            expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
            expect(exampleOffer.GetChanges()[1]).toBeInstanceOf(OfferModified);
        }),
        it("no debe modificar la oferta cuando se cambia el estado de suspendida a cerrada",()=>{        
            expect(()=> exampleOffer.ModifyOffer(
                    new OfferStateVO(OfferStatesEnum.Closed),
                    new PublicationDateVO(new Date('2000-01-31')),
                    new RatingVO(7),
                    new DirectionVO("AV Romulo Gallegos"),
                    new SectorVO(Sectors.Technology),
                    new BudgetVO(2000),
                    new DescriptionVO("descripcion de prueba"),)
            ).toThrowError(Error);
        }),
        it("debe modificar la oferta cuando se cambia el estado de suspendida a activa",()=>{        
            exampleOffer.ModifyOffer(
                new OfferStateVO(OfferStatesEnum.Active),
                new PublicationDateVO(new Date('2000-01-31')),
                new RatingVO(7),
                new DirectionVO("AV Romulo Gallegos"),
                new SectorVO(Sectors.Technology),
                new BudgetVO(2000),
                new DescriptionVO("descripcion de prueba"),);
            expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
            expect(exampleOffer.GetChanges()[1]).toBeInstanceOf(OfferModified);
            expect(exampleOffer.GetChanges()[2]).toBeInstanceOf(OfferModified);      
        })
    })
    
