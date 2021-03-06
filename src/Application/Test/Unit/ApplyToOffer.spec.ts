import { randomUUID } from 'crypto';
import { InMemoryCandidateCommandRepository } from '../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo';
import { Candidate } from '../../../Dominio/AggRoots/Candidate/Candidate';
import { MockOfferRepo } from '../../../Infrastructure/Memory/MockOfferRepo.repo';
import { Offer } from '../../../Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import {
  OfferStatesEnum,
  OfferStateVO,
} from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { PublicationDateVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { OfferLocationVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import {
  Sectors,
  SectorVO,
} from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import { BudgetVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { CandidateIdVo } from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import {
  CandidateStatesEnum,
  CandidateStateVo,
} from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { CandidateFullNameVo } from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo';
import { CandidatePhoneVo } from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo';
import { CandidateEmailVo } from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo';
import { CandidateBirthDateVo } from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo';
import { CandidateLocationVo } from '../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO';
import { IOfferRepository } from '../../Repositories/OfferRepository.repo';
import { OfferApplicationService } from '../../ApplicationServices/Offer/OfferApplicationService.service';
import { ApplyToOfferDTO } from '../../DTO/Application/ApplicationDTO.dto';
import { MockSenderAdapter } from '../../../Infrastructure/Memory/MorckSenderAdapter';
import { INotificationSender } from '../../Ports/INotificationSender';
import { Employer } from '../../../Dominio/AggRoots/Employer/Employer';
import { EmployerComercialDesignationVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo';
import { EmployerDescriptionVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO';
import { EmployerLocationVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO';
import { EmployerMailVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo';
import { EmployerNameVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo';
import { EmployerPhoneVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo';
import { EmployerRifVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO';
import {
  EmployerStateVO,
  EmployerStates,
} from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';
import { EmployerIdVO } from '../../../Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';
import { ICandidateRepository } from '../../Repositories/CandidateRepository';
import { EmployerRepository } from '../../Repositories/Employer/repository.interface';
import { MockEmployerRepo } from '../../../Infrastructure/Memory/MockEmployerRepo.repo';
import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';
import { ApplicationStates } from 'src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates';

const MCCrepo = new InMemoryCandidateCommandRepository();
const Orepo = new MockOfferRepo();
const EMrepo = new MockEmployerRepo();
const Msender = new MockSenderAdapter();

//const ExCommand = new ApplyToOfferDTO('1', '1', 100, 'prueba', 3);
const WrongCommand = { Prueba: 1 };

const exampleOffer = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Active),
  PublicationDateVO.Create(new Date()),
  RatingVO.Create(0),
  new OfferLocationVO(50, 150),
  new SectorVO(Sectors.Laws),
  BudgetVO.Create(400),
  DescriptionVO.Create('Oferta de prueba'),
);
const exampleCandidate = new Candidate(
  new CandidateIdVo(),
  new CandidateStateVo(CandidateStatesEnum.Active),
  new CandidateFullNameVo('Peter', 'Parker'),
  new CandidatePhoneVo('0414', '4407938'),
  new CandidateEmailVo('spidey@gmail.com'),
  new CandidateBirthDateVo(new Date('2000-01-16')),
  new CandidateLocationVo(20, 90),
);

const exampleEmployer: Employer = Employer.RegisterEmployer(
  EmployerNameVO.Create('Soluciones de Prueba'),
  EmployerDescriptionVO.Create('La descripcion es una prueba'),
  new EmployerStateVO(EmployerStates.Active),
  new EmployerLocationVO(24, 100),
  EmployerRifVO.Create('J-1236782'),
  EmployerPhoneVO.Create('+584124578457'),
  EmployerMailVO.Create('prueba@test.com'),
  EmployerComercialDesignationVO.Create('Informatica24.c.a'),
  new EmployerIdVO(randomUUID()),
);

const ExCommand = new ApplyToOfferDTO({
  offerId: exampleOffer._Id._value,
  employerId: exampleEmployer.employerId._guid_value,
  candidateId: exampleCandidate.Id.value,
  state: ApplicationStates.Active,
  //  previous_state: previous_state,
  budget: 200,
  description: 'Descripcion de prueba',
  duration_days: 3,
});

function create_Service(
  repoO: IOfferRepository,
  repoCC: ICandidateRepository,
  reporEm: EmployerRepository,
  Msender: INotificationSender,
): OfferApplicationService {
  const service = new OfferApplicationService(repoO, repoCC, reporEm, Msender);
  return service;
}

describe('Create an aplication to an offer', () => {
  it('should suceed when valid candidate applies to a valid Offer', async () => {
    await MCCrepo.save(exampleCandidate);
    let newOffer = EntitiesFactory.fromOfferToOfferDTO(exampleOffer);
    await Orepo.save(newOffer);
    let ApplyService = create_Service(Orepo, MCCrepo, EMrepo, Msender);
    await ApplyService.Handle(ExCommand).catch((err) => {
      throw err;
    });
    let new_offer = await Orepo.getOfferById(newOffer.OfferId);
    let new_test_offer = EntitiesFactory.fromOfferDTOtoOffer(new_offer);
    expect(
      () =>
        new_test_offer._application[0].getCandidateId() == exampleCandidate.Id,
    );
  });
  it('Should fail when using an Invalid command', async () => {
    let ApplyService = create_Service(Orepo, MCCrepo, EMrepo, Msender);
    let error: any = undefined;
    await ApplyService.Handle(WrongCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(
      new Error(`OfferService: Command doesn't exist: ${Object}`),
    );
  });
  it('Should send a notification to the given employer', async () => {
    let ApplyService = create_Service(Orepo, MCCrepo, EMrepo, Msender);
    await ApplyService.Handle(ExCommand).catch((err) => {
      throw err;
    });
    expect(Msender.NotificatedIds[0]).toBe(
      exampleEmployer.employerId._guid_value,
    );
  });
});
