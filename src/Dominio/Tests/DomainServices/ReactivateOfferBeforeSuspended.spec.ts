import { OfferStatesEnum, OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVo";
import { Offer } from "../../AggRoots/Offer/Offer";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { OfferLocationVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { Sectors, SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVo";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferCreated } from "../../DomainEvents/OfferEvents/OfferCreated";
import { OfferReactivated } from "../../DomainEvents/OfferEvents/OfferReactivated";
import { OfferSuspended } from "../../DomainEvents/OfferEvents/OfferSuspended";
import { ReactivateOfferBeforeSuspended } from "../../DomainService/ReactivateOfferBeforeSuspended";

function create_exampleOffer(): Offer{
    
    const exampleOffer = Offer.CreateOffer(
        new OfferStateVO(OfferStatesEnum.Active),
        PublicationDateVO.Create(new Date('1999-05-13')),
        RatingVO.Create(5),
        new OfferLocationVO(24,150),
        new SectorVO(Sectors.Technology),
        BudgetVO.Create(1500),
        DescriptionVO.Create("descripcion de prueba"));
    

    return exampleOffer
}

function create_Service(offer: Offer): ReactivateOfferBeforeSuspended{
    
    const service = new ReactivateOfferBeforeSuspended(offer)

    return service
}

    describe("crear una oferta y luego suspenderla, pasado el tiempo reglamentario reactivarla", () => {

        it("Se espera que suspenda la oferta mientras transcurre el tiempo reglamentario y luego la reactive", async () =>{           
            
            let actualOffer = create_exampleOffer();
            let actualService = create_Service(actualOffer);
            actualOffer.addObserver(actualService);
            actualOffer.SuspendOffer(false);
            setTimeout(() => {
            expect(actualOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
            expect(actualOffer.GetChanges()[1]).toBeInstanceOf(OfferSuspended);
            expect(actualOffer.GetChanges()[2]).toBeInstanceOf(OfferReactivated);
            },10000);                       
        })       
    
    })   