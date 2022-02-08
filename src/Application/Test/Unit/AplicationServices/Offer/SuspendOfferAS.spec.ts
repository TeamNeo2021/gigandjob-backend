import { MockOfferRepo } from '../../../../../Infrastructure/Memory/MockOfferRepo.repo';
import { Offer } from '../../../../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferLocationVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { OfferIdVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { PublicationDateVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { SectorVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import { Sectors } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import { OfferStateVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { OfferStatesEnum } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { randomUUID } from 'crypto';
import {IOfferRepository} from "../../../../../Application/Repositories/OfferRepository.repo";
import {OfferApplicationService} from "../../../../ApplicationServices/Offer/OfferApplicationService.service";
import { MockSenderAdapter } from "src/Infrastructure/Memory/MorckSenderAdapter";
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { SuspendOfferDTO } from 'src/Application/DTO/Offer/SuspendOffer.dto';
import { MockEmployerRepo } from '../../../../../Infrastructure/Memory/MockEmployerRepo.repo';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { LocationDTO } from 'src/Application/DTO/Location.dto';
import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const EMrepo = new MockEmployerRepo();



 const activeOffer = new OfferDTO({
  OfferId: randomUUID(),
  State: OfferStatesEnum.Active,
  PublicationDate: new Date(),
  Rating: 3,
  Direction: new LocationDTO({
    latitude: 24,
    longitude: 150,
  }),
  Sector: Sectors.Technology,
  Budget: 666,
  Description: 'Oferta de prueba11',

})

const closedOffer = new OfferDTO({
  OfferId: randomUUID(),
  State: OfferStatesEnum.Closed,
  PublicationDate: new Date(),
  Rating: 3,
  Direction: new LocationDTO({
    latitude: 24,
    longitude: 90,
  }),
  Sector: Sectors.Laws,
  Budget: 450,
  Description: 'Oferta de prueba2',

})

const OfferRepo = new MockOfferRepo();



function create_Service(repoO: IOfferRepository): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, EMrepo, Msender);
  return service;
}

describe('Suspender una oferta', () => {
  it('debe tener éxito al suspender una oferta cuando esta activa', async () => {
    await OfferRepo.save(activeOffer);
    let exampleOffer: OfferDTO = await OfferRepo.getOfferById(
      activeOffer.OfferId
    );
    let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
    let ExCommand = new SuspendOfferDTO((await offer)._Id.value);
    let OfferService = create_Service(OfferRepo);
    OfferService.Handle(ExCommand);
    let suspendedOffer: OfferDTO = await OfferRepo.getOfferById(offer._Id._value);
    expect(
      () =>
      suspendedOffer.State.toString() ==
        OfferStatesEnum.Suspended.toString(),
    );
  });

  
  // it('no debe tener éxito cuando una oferta esta cerrada', async () => {
  //   await OfferRepo.save(closedOffer);
  //   let exampleOffer: OfferDTO = await OfferRepo.getOfferById(
  //     closedOffer.OfferId
  //   );
  //   let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
  //   let closeOfferCommand  = new CloseOffer
  //   exampleOffer._State.state = OfferStatesEnum.Closed;
  //   let ExCommand = new SuspendOfferDTO((await offer)._Id.value);
  //   let OfferService = create_Service(OfferRepo);
  //   let error: any = undefined;
  //   await OfferService.Handle(ExCommand).catch((err) => (error = err));
  //   expect(() => {
  //     throw error;
  //   }).toThrowError(error);
  // });
});
