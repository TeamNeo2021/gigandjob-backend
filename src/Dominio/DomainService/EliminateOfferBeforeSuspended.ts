import { Offer } from '../AggRoots/Offer/Offer';
import { IObserver } from '../Core/IObserver';
import { OfferSuspended } from '../DomainEvents/OfferEvents/OfferSuspended';

export class EliminateOfferBeforeSuspended implements IObserver {
  private readonly offer: Offer;

  private readonly maxSuspendedevents: number = 3;

  constructor(offer: Offer) {
    this.offer = offer;
  }

  update(): void {
    this.checkOfferSuspended();
  }

  //se verifica si es un evento de suspender oferta y de serlo
  //se verifica si es la tercera vez para eliminarla
  private checkOfferSuspended() {
    //eventos de la entidad offer
    const changes = this.offer.GetChanges();

    //último evento
    const last_change = changes[changes.length - 1];

    //Si no es el evento de suspender oferta no se hace nada más
    if (!(last_change instanceof OfferSuspended)) {
      return;
    }

    const suspendedEvents = [];

    //se recorre la lista de eventos y se verifica que sea oferta suspendida y se agrega a suspendedEvents
    for (const change of changes) {
      if (change instanceof OfferSuspended) {
        suspendedEvents.push(change);
      }
    }

    //Si la cantidad de eventos en suspendedEvents es mayor o igual al maximo de eventos permitidos
    //entonces se elimina la oferta
    if (suspendedEvents.length >= this.maxSuspendedevents) {
      this.offer.EliminateOffer();
    }
  }
}
