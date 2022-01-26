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

const ExCommand = new ApplyToOfferDTO('1', '1', 100, 'prueba', 3);
const MCQrepo = new InMemoryCandidateCommandRepository();
const MCCrepo = new InMemoryCandidateCommandRepository();
const Orepo = new InMemoryOfferRepo();

function create_Service(
  repoO: IOfferRepository,
  repoCQ: ICandidateQuerryRepository,
  repoCC: ICandidateCommandRepository,
): ApplyService {
  const service = new ApplyService(repoO, repoCQ, repoCC);
  return service;
}

describe('Create an aplication to an offer', () => {
  it('should suceed when valid candidate applies to a valid Offer', () => {
    expect(registerService.RegisterCandidate(CandidateTestDTO)).toBeInstanceOf(
      Candidate,
    );
  });
});
