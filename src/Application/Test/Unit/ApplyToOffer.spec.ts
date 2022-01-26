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
import { ApplyService } from '../../ApplicationServices/ApplyService.service';
import { ApplyToOfferDTO } from '../../DTO/Application/ApplyToOffer.dto';

const MCQrepo = new InMemoryCandidateCommandRepository();
const MCCrepo = new InMemoryCandidateCommandRepository();
const Orepo = new MockOfferRepo();

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

function create_Service(
  repoO: IOfferRepository,
  repoCQ: ICandidateQuerryRepository,
  repoCC: ICandidateCommandRepository,
): ApplyService {
  const service = new ApplyService(repoO, repoCQ, repoCC);
  return service;
}

describe('Create an aplication to an offer', () => {
  it('should suceed when valid candidate applies to a valid Offer', async () => {
    MCQrepo.save(exampleCandidate);
    await Orepo.save(exampleOffer);
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
    let new_offer: Offer = await Orepo.load(exampleOffer._Id);
    expect(new_offer._application[0]).toBe(exampleCandidate);
    //expect(()=> Orepo.load(exampleOffer._Id).application[0] == exampleCandidate);
    //expect(Orepo.load(exampleOffer._Id).application[0].id).toBe(exampleCandidate.id);
    //expect(()=> Orepo.load(exampleOffer._Id).application[0].id == exampleCandidate.id);
  });
  /*it('Should fail when using an Invalid command', () => {
    let ApplyService = create_Service(Orepo, MCCrepo, MCCrepo);
    expect(() => ApplyService.Handle(WrongCommand)).toThrowError(Error);
  });*/
});
