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
import { DirectionVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
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
import { ICandidateQuerryRepository } from '../../Repositories/CandidateQuerryRepository.repo';
import { ICandidateCommandRepository } from '../../Repositories/CandidateCommandRepository.repo';
import { OfferApplicationService } from '../../ApplicationServices/OfferApplicationService.service';
import { ApplyToOfferDTO } from '../../DTO/Application/ApplyToOffer.dto';
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

const MCCrepo = new InMemoryCandidateCommandRepository();
const Orepo = new MockOfferRepo();
const Msender = new MockSenderAdapter();

//const ExCommand = new ApplyToOfferDTO('1', '1', 100, 'prueba', 3);
const WrongCommand = { Prueba: 1 };

const exampleOffer = new Offer(
  new OfferIdVO(randomUUID()),
  new OfferStateVO(OfferStatesEnum.Active),
  new PublicationDateVO(new Date()),
  new RatingVO(0),
  new DirectionVO('direction'),
  new SectorVO(Sectors.Laws),
  new BudgetVO(400),
  new DescriptionVO('Oferta de prueba'),
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
  new EmployerNameVO('Soluciones de Prueba'),
  new EmployerDescriptionVO('La descripcion es una prueba'),
  new EmployerStateVO(EmployerStates.Active),
  new EmployerLocationVO('Av los Cedros'),
  new EmployerRifVO('J-1236782'),
  new EmployerPhoneVO('+584124578457'),
  new EmployerMailVO('prueba@test.com'),
  new EmployerComercialDesignationVO('Informatica24.c.a'),
  new EmployerIdVO(randomUUID()),
);

const ExCommand = new ApplyToOfferDTO(
  exampleOffer._Id.value,
  exampleCandidate.id,
  exampleEmployer.employerId._guid_value,
  100,
  'prueba',
  3,
);

function create_Service(
  repoO: IOfferRepository,
  repoCQ: ICandidateQuerryRepository,
  repoCC: ICandidateCommandRepository,
  Msender: INotificationSender,
): OfferApplicationService {
  const service = new OfferApplicationService(repoO, repoCQ, repoCC, Msender);
  return service;
}

describe('Create an aplication to an offer', () => {
  it('should suceed when valid candidate applies to a valid Offer', async () => {
    MCCrepo.save(exampleCandidate);
    await Orepo.save(exampleOffer);
    let ApplyService = create_Service(Orepo, MCCrepo, MCCrepo, Msender);
    ApplyService.Handle(ExCommand);
    let new_offer: Offer = await Orepo.load(exampleOffer._Id);
    expect(
      () => new_offer._application[0].getCandidateId() == exampleCandidate.Id,
    );
  });
  it('Should fail when using an Invalid command', async () => {
    let ApplyService = create_Service(Orepo, MCCrepo, MCCrepo, Msender);
    let error: any = undefined;
    await ApplyService.Handle(WrongCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(
      new Error(`ApplyService: Command doesn't exist: ${Object}`),
    );
  });
  it('Should send a notification to the given employer', async () => {
    let ApplyService = create_Service(Orepo, MCCrepo, MCCrepo, Msender);
    await ApplyService.Handle(ExCommand);
    expect(Msender.NotificatedIds[0]).toBe(
      exampleEmployer.employerId._guid_value,
    );
  });
});
