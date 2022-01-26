import { CandidateRegisterService } from '../../ApplicationServices/CandidateRegister.service';
import { InMemoryCandidateCommandRepository } from '../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo';
import { Candidate } from '../../../Dominio/AggRoots/Candidate/Candidate';
import { ICandidateQuerryRepository } from 'src/Application/Repositories/CandidateQuerryRepository.repo';
import { ICandidateCommandRepository } from 'src/Application/Repositories/CandidateCommandRepository.repo';
import { ApplyService } from 'src/Application/ApplicationServices/ApplyService.service';
import { IOfferRepository } from 'src/Application/Repositories/OfferRepository.repo';
import { ApplyToOfferDTO } from 'src/Application/DTO/Application/ApplyToOffer.dto';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { CandidateIdVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import {
  OfferStatesEnum,
  OfferStateVO,
} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { PublicationDateVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { DirectionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import {
  Sectors,
  SectorVO,
} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import { BudgetVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { CandidateBirthDateVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo';
import { CandidateEmailVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo';
import { CandidateFullNameVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo';
import { CandidateLocationVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO';
import { CandidatePhoneVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo';
import {
  CandidateStateVo,
  CandidateStatesEnum,
} from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { MockOfferRepo } from 'src/Infrastructure/Memory/MockOfferRepo.repo';

const MCQrepo = new InMemoryCandidateCommandRepository();
const MCCrepo = new InMemoryCandidateCommandRepository();
const Orepo = new MockOfferRepo();

//const ExCommand = new ApplyToOfferDTO('1', '1', 100, 'prueba', 3);
const WrongCommand = { Hola: 1 };
const exampleOffer = new Offer(
  new OfferIdVO('1'),
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

function create_Service(
  repoO: IOfferRepository,
  repoCQ: ICandidateQuerryRepository,
  repoCC: ICandidateCommandRepository,
): ApplyService {
  const service = new ApplyService(repoO, repoCQ, repoCC);
  return service;
}

describe('Create an aplication to an offer', () => {
  /*it('should suceed when valid candidate applies to a valid Offer', () => {
    MCQrepo.save(exampleCandidate);
    Orepo.save(exampleOffer);
    let ExCommand = new ApplyToOfferDTO(
      exampleOffer._Id.value,
      exampleCandidate.id,
      100,
      'prueba',
      3,
    );
    exampleOffer._application[0];
    let ApplyService = create_Service(Orepo, MCCrepo, MCCrepo);
    ApplyService.Handle(ExCommand);
    expect(Orepo.load(exampleOffer._Id).application[0]).toBe(exampleCandidate);
    //expect(()=> Orepo.load(exampleOffer._Id).application[0] == exampleCandidate);
    //expect(Orepo.load(exampleOffer._Id).application[0].id).toBe(exampleCandidate.id);
    //expect(()=> Orepo.load(exampleOffer._Id).application[0].id == exampleCandidate.id);
  });*/
  it('Should fail when using an Invalid command', () => {
    let ApplyService = create_Service(Orepo, MCCrepo, MCCrepo);
    expect(() => ApplyService.Handle(WrongCommand)).toThrowError(Error);
  });
});
