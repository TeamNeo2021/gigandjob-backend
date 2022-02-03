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
import { EliminatedOfferDTO } from "../../../../DTO/Offer/EliminatedOfferDTO";
import { MockSenderAdapter } from "src/Infrastructure/Memory/MorckSenderAdapter";
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { MockEmployerRepo } from '../../../../../Infrastructure/Memory/MockEmployerRepo.repo';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const EMrepo = new MockEmployerRepo();

const exampleOffer2 = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Active),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(0),
  OfferLocationVO.Create('direction'),
  new SectorVO(Sectors.Laws),
  BudgetVO.Create(400),
  DescriptionVO.Create('Oferta de prueba'),
);

const exampleOffer3 = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Active),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(0),
  OfferLocationVO.Create('direction'),
  new SectorVO(Sectors.Laws),
  BudgetVO.Create(400),
  DescriptionVO.Create('Oferta de prueba'),
);

const Orepo = new MockOfferRepo();



function create_Service(repoO: IOfferRepository): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, EMrepo, Msender);
  return service;
}

describe('Eliminar una oferta', () => {
  it('debe tener éxito al eliminar una oferta cuando esta activa', async () => {
    await Orepo.save(exampleOffer2);
    let exampleOffer: Offer = await Orepo.getOfferById(
      new OfferIdVO(exampleOffer2._Id.value),
    );
    let ExCommand = new EliminatedOfferDTO((await exampleOffer)._Id.value);
    let OfferService = create_Service(Orepo);
    OfferService.Handle(ExCommand);
    let oferReactived: Offer = await Orepo.getOfferById(exampleOffer._Id);
    expect(
      () =>
        oferReactived._State.state.toString() ==
        OfferStatesEnum.Eliminated.toString(),
    );
  });
  it('no debe tener éxito cuando una oferta esta cerrada', async () => {
    await Orepo.save(exampleOffer3);
    let exampleOffer: Offer = await Orepo.getOfferById(
      new OfferIdVO(exampleOffer3._Id.value),
    );
    exampleOffer._State.state = OfferStatesEnum.Closed;
    let ExCommand = new EliminatedOfferDTO((await exampleOffer)._Id.value);
    let OfferService = create_Service(Orepo);
    let error: any = undefined;
    await OfferService.Handle(ExCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(error);
  });
});
