import { DirectionVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { Offer } from "../../AggRoots/Offer/Offer";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVo";
import { OfferModified } from "../../DomainEvents/OfferEvents/OfferModified";
import { OfferCreated } from "../../DomainEvents/OfferEvents/OfferCreated";
import { InvalidOfferState } from "../../AggRoots/Offer/Errors/InvalidOfferState.error";
import { OfferSuspended } from "../../DomainEvents/OfferEvents/OfferSuspended";
import { OfferReactivated } from "../../DomainEvents/OfferEvents/OfferReactivated";
import { OfferEliminated } from "../../DomainEvents/OfferEvents/OfferEliminated";
import { type } from "os";

const exampleOffer = Offer.CreateOffer(
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date('1999-05-13')),
    new RatingVO(5),
    new DirectionVO("AV Francisco de Miranda"),
    new SectorVO(Sectors.Technology),
    new BudgetVO(1500),
    new DescriptionVO("descripcion de prueba"));

const exampleOfferReactived = Offer.CreateOffer(
        new OfferStateVO(OfferStatesEnum.Active),
        new PublicationDateVO(new Date('1999-05-13')),
        new RatingVO(5),
        new DirectionVO("AV Francisco de Miranda"),
        new SectorVO(Sectors.Technology),
        new BudgetVO(1500),
        new DescriptionVO("descripcion de prueba"));

const exampleOfferEliminited = Offer.CreateOffer(
        new OfferStateVO(OfferStatesEnum.Active),
        new PublicationDateVO(new Date('1999-05-13')),
        new RatingVO(5),
        new DirectionVO("AV Francisco de Miranda"),
        new SectorVO(Sectors.Technology),
        new BudgetVO(1500),
        new DescriptionVO("descripcion de prueba"));


describe("crear una oferta", () => {

    it("debe crear la oferta cuando se crea con un estado activa", () => {
        expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
    })
});

describe("modificar una oferta", () => {
    
    it("debe modificar la oferta cuando el estado es activa a suspendida", () => {
        exampleOffer.ModifyOffer(
            new PublicationDateVO(new Date('2000-01-31')),
            new RatingVO(7),
            new DirectionVO("AV Romulo Gallegos"),
            new SectorVO(Sectors.Technology),
            new BudgetVO(2000),
            new DescriptionVO("descripcion de prueba"));
            expect(exampleOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
            expect(exampleOffer.GetChanges()[1]).toBeInstanceOf(OfferModified);
    })    
});

describe("Reactivar oferta",()=> {
    
    it("No se reactivar una oferta si no ha sido suspendida o este activa",() =>{
        expect(()=>exampleOfferReactived.ReactivateOffer()).toThrowError(Error);
    })
    it("Se debe Reactivar una oferta si ha sido suspendida",() =>{
        exampleOfferReactived.SuspendOffer();
        exampleOfferReactived.ReactivateOffer();
        expect(exampleOfferReactived.GetChanges()[0]).toBeInstanceOf(OfferCreated);
        expect(exampleOfferReactived.GetChanges()[1]).toBeInstanceOf(OfferSuspended);
        expect(exampleOfferReactived.GetChanges()[2]).toBeInstanceOf(OfferReactivated);
    })
    it("No se reactiva una oferta que ha sido eliminada",() =>{
        exampleOfferReactived.EliminateOffer();
        expect(()=>exampleOfferReactived.ReactivateOffer()).toThrowError(Error);
    })
});

describe("Eliminar oferta",()=> {
    it("No se debe eliminar una oferta que ha sido cerrrada ",() =>{
        exampleOfferEliminited._State=new OfferStateVO(OfferStatesEnum.Closed);
        expect(()=>exampleOfferEliminited.EliminateOffer()).toThrowError(Error);
    })
    it("Se debe eliminar una oferta que ha sido suspendida",() =>{
        exampleOfferEliminited._State=new OfferStateVO(OfferStatesEnum.Active);
        exampleOfferEliminited.SuspendOffer();
        exampleOfferEliminited.EliminateOffer();
        expect(exampleOfferEliminited.GetChanges()[0]).toBeInstanceOf(OfferCreated);
        expect(exampleOfferEliminited.GetChanges()[1]).toBeInstanceOf(OfferSuspended);
        expect(exampleOfferEliminited.GetChanges()[2]).toBeInstanceOf(OfferEliminated);        
    })
    
    it("No se debe eliminar una oferta que ha sido eliminada",() =>{
        expect(()=>exampleOfferEliminited.EliminateOffer()).toThrowError(Error);
    })
})