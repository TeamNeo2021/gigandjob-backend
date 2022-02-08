import { OfferStatesEnum, OfferStateVO } from "../../AggRoots/Offer/ValueObjects/OfferStateVo";
import { Offer } from "../../AggRoots/Offer/Offer";
import { PublicationDateVO } from "../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { OfferLocationVO } from "../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { Sectors, SectorVO } from "../../AggRoots/Offer/ValueObjects/OfferSectorVo";
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferCreated } from "../../DomainEvents/OfferEvents/OfferCreated";
import { OfferSuspended } from "../../DomainEvents/OfferEvents/OfferSuspended";
import { Employer } from "../../AggRoots/Employer/Employer";
import { EmployerComercialDesignationVO } from "../../AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";
import { EmployerDescriptionVO } from "../../AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerLocationVO } from "../../AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerMailVO } from "../../AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerNameVO } from "../../AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerPhoneVO } from "../../AggRoots/Employer/ValueObjects/EmployerPhoneVo";
import { EmployerRifVO } from "../../AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerStates, EmployerStateVO } from "../../AggRoots/Employer/ValueObjects/EmployerStateVo";
import { EmployerRegistered } from "../../DomainEvents/EmployerEvents/EmployerRegistered";
import { EmployerSuspended } from "../../DomainEvents/EmployerEvents/EmployerSuspended";
import { SuspendOffersFromEmployerSuspended } from "src/Dominio/DomainService/SupendOffersFromEmployerSuspended";

function create_exampleEmployer(): Employer{
    
    const exampleEmployer = Employer.RegisterEmployer(
        EmployerNameVO.Create("Soluciones de Prueba"),
        EmployerDescriptionVO.Create("La descripcion es una prueba"),
        new EmployerStateVO(EmployerStates.Active),
        new EmployerLocationVO(90,90),
        EmployerRifVO.Create("J-1236782"),
        EmployerPhoneVO.Create("+584124578457"),
        EmployerMailVO.Create("prueba@test.com"),
        EmployerComercialDesignationVO.Create("Informatica24.c.a"));
    

    return exampleEmployer
}

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

function create_Service(employer: Employer): SuspendOffersFromEmployerSuspended{
    
    const service = new SuspendOffersFromEmployerSuspended(employer)

    return service
}

describe("crear una oferta y un Empleador luego suspender el empleador, luego deberia suspenderse la oferta", () => {

    it("Se espera que suspenda la oferta mientras transcurre el tiempo reglamentario y luego la reactive", () =>{           
        let actualEmployer = create_exampleEmployer();
        let actualOffer = create_exampleOffer();        
        actualEmployer.offers.push(actualOffer);
        let actualService = create_Service(actualEmployer);
        actualEmployer.addObserver(actualService);
        actualEmployer.SuspendEmployer();
        
        expect(actualOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
        expect(actualOffer.GetChanges()[1]).toBeInstanceOf(OfferSuspended);
        expect(actualEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
        expect(actualEmployer.GetChanges()[1]).toBeInstanceOf(EmployerSuspended);
                    
    })       

}) 