import { Employer } from "../AggRoots/Employer/Employer";
import { OfferStatesEnum } from "../AggRoots/Offer/ValueObjects/OfferStateVo";
import { IObserver } from "../Core/IObserver";
import { EmployerSuspended } from "../DomainEvents/EmployerEvents/EmployerSuspended";

export class SuspendOffersFromEmployerSuspended implements IObserver{
    
    private readonly employer: Employer;

    constructor(
       employer: Employer,
    ){
        this.employer = employer;        
    }

    update(): void {
        
        this.checkEmployerSuspended();
    
    }

    //se verifica si es un evento de suspender empleador y de serlo se suspenden sus ofertas
    private checkEmployerSuspended () {
        
        //eventos de la entidad employer
        const changes = this.employer.GetChanges();

       //último evento
        const last_change = changes[changes.length-1]

        
        //Si no es el evento de suspender empleador no se hace nada más
        if (!(last_change instanceof EmployerSuspended)){
            return;
        }

        //Se recorre la lista de ofertas y se suspenden las que no estén ya suspendidas, eliminadas o cerradas
        for (let offer of this.employer.offers){
            if ((offer._State.state != OfferStatesEnum.Suspended) && (offer._State.state != OfferStatesEnum.Closed) && (offer._State.state != OfferStatesEnum.Eliminated)) {
                
                //se suspende la oferta con true debido a 
                //que se esta suspendiendo debido a la suspension del empleador
                offer.SuspendOffer(true);
            } 
        }
    }
}