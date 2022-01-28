import { Offer } from "../AggRoots/Offer/Offer";
import { IObserver } from "../Core/IObserver";
import { OfferSuspended } from "../DomainEvents/OfferEvents/OfferSuspended";

export class ReactivateOfferBeforeSuspended implements IObserver{
    
    private readonly offer: Offer;
    
    //tiempo en milisegundos en el que se ejecutara la reactivación de la oferta
    //por motivos de prueba se le coloca 1 minuto
    private readonly reglamentaryTime: number = 60000;

    constructor(
       offer: Offer,
    ){
        this.offer = offer;        
    }

    update(): void {
        
        this.checkOfferSuspended();
    
    }

    //se verifica si es un evento de suspender oferta y de serlo se agrega a la cola de ejecución de node.js
    //la función que reactivara la oferta luego del tiempo transcurrido
    private checkOfferSuspended () {
        
        //eventos de la entidad offer
        const changes = this.offer.GetChanges();

       //último evento
        const last_change = changes[changes.length-1]

        
        //Si no es el evento de suspender empleador no se hace nada más
        if (!(last_change instanceof OfferSuspended)){
            // se castea el domain event para cosultar sus atributos
            const eventOfferSuspended: OfferSuspended = last_change as OfferSuspended;
            //si no fue suspendida por que se suspendio el empleador
            if(eventOfferSuspended.isSuspendedEmployer == false){
                //luego del tiempo reglamentario se reactivará la oferta 
                console.log("entre luego de un evento de suspension")
                setTimeout(function() {
                    this.offer.ReactivateOffer();
                }, this.reglamentaryTime);
            
            //si se suspendio por el empleador entonces no se ejecuta nada más
            } else {
                return;
            }           
            
        }        
    }
    
}