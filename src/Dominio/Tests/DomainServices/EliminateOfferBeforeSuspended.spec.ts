import {
  OfferStatesEnum,
  OfferStateVO,
} from '../../AggRoots/Offer/ValueObjects/OfferStateVo';
import { Offer } from '../../AggRoots/Offer/Offer';
import { PublicationDateVO } from '../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../AggRoots/Offer/ValueObjects/OfferRatingVO';
import { OfferLocationVO } from '../../AggRoots/Offer/ValueObjects/OfferDirectionVO';
import {
  Sectors,
  SectorVO,
} from '../../AggRoots/Offer/ValueObjects/OfferSectorVo';
import { BudgetVO } from '../../AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferCreated } from '../../DomainEvents/OfferEvents/OfferCreated';
import { OfferReactivated } from '../../DomainEvents/OfferEvents/OfferReactivated';
import { OfferSuspended } from '../../DomainEvents/OfferEvents/OfferSuspended';
import { OfferEliminated } from 'src/Dominio/DomainEvents/OfferEvents/OfferEliminated';
import { EliminateOfferBeforeSuspended } from 'src/Dominio/DomainService/EliminateOfferBeforeSuspended';

function create_exampleOffer(): Offer {
  const exampleOffer = Offer.CreateOffer(
    new OfferStateVO(OfferStatesEnum.Active),
    PublicationDateVO.Create(new Date('1999-05-13')),
    RatingVO.Create(5),
    new OfferLocationVO(24, 150),
    new SectorVO(Sectors.Technology),
    BudgetVO.Create(1500),
    DescriptionVO.Create('descripcion de prueba'),
  );

  return exampleOffer;
}

function create_Service(offer: Offer): EliminateOfferBeforeSuspended {
  const service = new EliminateOfferBeforeSuspended(offer);

  return service;
}

describe('crear una oferta y luego suspenderla X veces, luego de x veces se debe eliminar', () => {
  it('Se debe eliminar la oferta suspendendida luego de x veces', () => {
    const actualOffer = create_exampleOffer();
    const actualService = create_Service(actualOffer);
    actualOffer.addObserver(actualService);
    actualOffer.SuspendOffer(false);
    actualOffer.ReactivateOffer();
    actualOffer.SuspendOffer(false);
    actualOffer.ReactivateOffer();
    actualOffer.SuspendOffer(false);
    expect(actualOffer.GetChanges()[0]).toBeInstanceOf(OfferCreated);
    expect(actualOffer.GetChanges()[1]).toBeInstanceOf(OfferSuspended);
    expect(actualOffer.GetChanges()[2]).toBeInstanceOf(OfferReactivated);
    expect(actualOffer.GetChanges()[3]).toBeInstanceOf(OfferSuspended);
    expect(actualOffer.GetChanges()[4]).toBeInstanceOf(OfferReactivated);
    expect(actualOffer.GetChanges()[5]).toBeInstanceOf(OfferSuspended);
    expect(actualOffer.GetChanges()[6]).toBeInstanceOf(OfferEliminated);
  });
});
