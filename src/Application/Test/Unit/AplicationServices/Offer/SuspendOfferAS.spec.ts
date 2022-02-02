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
import { MockSenderAdapter } from "src/Infrastructure/Memory/MorckSenderAdapter";
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { SuspendOfferDTO } from 'src/Application/DTO/Offer/SuspendOffer.dto';
import { MockEmployerRepo } from '../../../../../Infrastructure/Memory/MockEmployerRepo.repo';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const EMrepo = new MockEmployerRepo();


const FirstExample = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Active),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(3),
  DirectionVO.Create('Tucacas'),
  new SectorVO(Sectors.Technology),
  BudgetVO.Create(666),
  DescriptionVO.Create('Oferta de prueba11'),
);

const SecondExample = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Closed),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(3),
  DirectionVO.Create('direction'),
  new SectorVO(Sectors.Laws),
  BudgetVO.Create(450),
  DescriptionVO.Create('Oferta de prueba2'),
);

const OfferRepo = new MockOfferRepo();



function create_Service(repoO: IOfferRepository): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, EMrepo, Msender);
  return service;
}

describe('Suspender una oferta', () => {
  it('debe tener éxito al suspender una oferta cuando esta activa', async () => {
    await OfferRepo.save(FirstExample);
    let exampleOffer: Offer = await OfferRepo.load(
      new OfferIdVO(FirstExample._Id.value),
    );
    let ExCommand = new SuspendOfferDTO((await exampleOffer)._Id.value);
    let OfferService = create_Service(OfferRepo);
    OfferService.Handle(ExCommand);
    let suspendedOffer: Offer = await OfferRepo.load(exampleOffer._Id);
    expect(
      () =>
      suspendedOffer._State.state.toString() ==
        OfferStatesEnum.Suspended.toString(),
    );
  });
  it('no debe tener éxito cuando una oferta esta cerrada', async () => {
    await OfferRepo.save(SecondExample);
    let exampleOffer: Offer = await OfferRepo.load(
      new OfferIdVO(SecondExample._Id.value),
    );
    exampleOffer._State.state = OfferStatesEnum.Closed;
    let ExCommand = new SuspendOfferDTO((await exampleOffer)._Id.value);
    let OfferService = create_Service(OfferRepo);
    let error: any = undefined;
    await OfferService.Handle(ExCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(error);
  });
});
