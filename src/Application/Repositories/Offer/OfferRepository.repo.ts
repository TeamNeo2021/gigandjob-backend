import { Offer } from "src/Dominio/AggRoots/Offer/Offer";

export interface OfferRepository{
    save(offer: Offer): void;
    getAll(): Promise<Offer[]>;
    get(id: string): Promise<Offer>;
}