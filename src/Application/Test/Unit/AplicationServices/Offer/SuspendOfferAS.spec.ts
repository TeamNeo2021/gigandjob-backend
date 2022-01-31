import { MockOfferRepo } from '../../../../../Infrastructure/Memory/MockOfferRepo.repo';
import { Offer } from '../../../../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { DirectionVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
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
import { EliminitedOfferDTO } from "../../../../DTO/Offer/EliminitedOfferDTO";
import { MockSenderAdapter } from "src/Infrastructure/Memory/MorckSenderAdapter";
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { SuspendOfferDTO } from 'src/Application/DTO/Offer/SuspendOffer.dto';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();

const exampleOffer2 = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Active),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(3),
  DirectionVO.Create('Tucacas'),
  new SectorVO(Sectors.Technology),
  BudgetVO.Create(666),
  DescriptionVO.Create('Oferta de prueba11'),
);

const exampleOffer3 = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Closed),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(3),
  DirectionVO.Create('direction'),
  new SectorVO(Sectors.Laws),
  BudgetVO.Create(450),
  DescriptionVO.Create('Oferta de prueba2'),
);

const Orepo = new MockOfferRepo();



function create_Service(repoO: IOfferRepository): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, Msender);
  return service;
}

describe('Suspender una oferta', () => {
  it('debe tener éxito al suspender una oferta cuando esta activa', async () => {
    await Orepo.save(exampleOffer2);
    let exampleOffer: Offer = await Orepo.load(
      new OfferIdVO(exampleOffer2._Id.value),
    );
    let ExCommand = new SuspendOfferDTO((await exampleOffer)._Id.value);
    let OfferService = create_Service(Orepo);
    OfferService.Handle(ExCommand);
    let suspendedOffer: Offer = await Orepo.load(exampleOffer._Id);
    expect(
      () =>
      suspendedOffer._State.state.toString() ==
        OfferStatesEnum.Suspended.toString(),
    );
  });
  it('no debe tener éxito cuando una oferta esta cerrada', async () => {
    await Orepo.save(exampleOffer3);
    let exampleOffer: Offer = await Orepo.load(
      new OfferIdVO(exampleOffer3._Id.value),
    );
    exampleOffer._State.state = OfferStatesEnum.Closed;
    let ExCommand = new SuspendOfferDTO((await exampleOffer)._Id.value);
    let OfferService = create_Service(Orepo);
    let error: any = undefined;
    await OfferService.Handle(ExCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(error);
  });
});
