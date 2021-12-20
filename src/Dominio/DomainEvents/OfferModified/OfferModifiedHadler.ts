import { Offer } from "../../AggRoots/Offer/Offer";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { OfferModified } from "./OfferModified";

export class OfferModifiedHandler implements IDomainEventHandler {
    handle(event: OfferModified, entity: Offer): void {
        entity._State = event.state;
        entity._PublicationDate = event.publicationDate;
        entity._Rating = event.rating;
        entity._Direction = event.direction;
        entity._Sector = event.sector;
        entity._Budget = event.budget;
        entity._Description = event.description;        
    }
  }