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
import { Employer } from 'src/Dominio/AggRoots/Employer/Employer';
import { EmployerComercialDesignationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo';
import { EmployerDescriptionVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO';
import { EmployerIdVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';
import { EmployerLocationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO';
import { EmployerMailVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo';
import { EmployerNameVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo';
import { EmployerPhoneVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo';
import { EmployerRifVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO';
import { EmployerStateVO, EmployerStates } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';
import { ICandidateRepository } from 'src/Application/Repositories/CandidateRepository';
import { INotificationSender } from 'src/Application/Ports/INotificationSender';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const OfferRepo = new MockOfferRepo();

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

const exampleEmployer: Employer = Employer.RegisterEmployer(
  EmployerNameVO.Create('Soluciones de Prueba'),
  EmployerDescriptionVO.Create('La descripcion es una prueba'),
  new EmployerStateVO(EmployerStates.Active),
  EmployerLocationVO.Create('Av los Cedros'),
  EmployerRifVO.Create('J-1236782'),
  EmployerPhoneVO.Create('+584124578457'),
  EmployerMailVO.Create('prueba@test.com'),
  EmployerComercialDesignationVO.Create('Informatica24.c.a'),
  new EmployerIdVO(randomUUID()),
);

function create_Service(repoO: IOfferRepository, MCandidateRepo: ICandidateRepository, Msender: INotificationSender,): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, Msender);
  return service;
}

describe('Suspender una oferta', () => {
  it('debe tener éxito al suspender una oferta cuando esta activa', async () => {
    await OfferRepo.save(FirstExample);
    let exampleOffer: Offer = await OfferRepo.load(
      new OfferIdVO(FirstExample._Id.value),
    );
    let ExCommand = new SuspendOfferDTO((exampleOffer)._Id.value, exampleEmployer.employerId._guid_value);
    let OfferService = create_Service(OfferRepo, MCandidateRepo, Msender);
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
    let ExCommand = new SuspendOfferDTO((await exampleOffer)._Id.value, exampleEmployer.employerId._guid_value);
    let OfferService = create_Service(OfferRepo, MCandidateRepo, Msender);
    let error: any = undefined;
    await OfferService.Handle(ExCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(error);
  });
  it('Should send a notification to the given employer', async () => {
    await OfferRepo.save(FirstExample);
    let exampleOffer: Offer = await OfferRepo.load(
      new OfferIdVO(FirstExample._Id.value),
    );
    let ExCommand = new SuspendOfferDTO((await exampleOffer)._Id.value, exampleEmployer.employerId._guid_value);
    let ApplyService = create_Service(OfferRepo, MCandidateRepo, Msender);
    console.log("Entrada");
    console.log(exampleEmployer.employerId._guid_value);
    console.log(ExCommand);
    await ApplyService.Handle(ExCommand);
    console.log("Salida");
    expect(Msender.NotificatedIds[0]).toBe(
      exampleEmployer.employerId._guid_value,
    );
  });
});
