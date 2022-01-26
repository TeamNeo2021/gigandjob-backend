import { Candidate } from 'src/Dominio/AggRoots/Candidate/Candidate';
import { Application } from 'src/Dominio/AggRoots/Offer/Application/Application';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { ApplyToOffer } from 'src/Dominio/DomainService/ApplyToOffer';
import { IApplicationService } from '../Core/IApplicationService';
import { ApplyToOfferDTO } from '../DTO/Application/ApplyToOffer.dto';
import { ICandidateCommandRepository } from '../Repositories/CandidateCommandRepository.repo';
import { ICandidateQuerryRepository } from '../Repositories/CandidateQuerryRepository.repo';
import { IOfferRepository } from '../Repositories/OfferRepository.repo';

export class ApplyService implements IApplicationService {
  private readonly Offerrepo: IOfferRepository;
  private readonly CandidaterepoQ: ICandidateQuerryRepository;
  private readonly CandidaterepoC: ICandidateCommandRepository;

  constructor(
    Offerrepo: IOfferRepository,
    CandidaterepoQ: ICandidateQuerryRepository,
    CandidaterepoC: ICandidateCommandRepository,
  ) {
    this.Offerrepo = Offerrepo;
    this.CandidaterepoQ = CandidaterepoQ;
    this.CandidaterepoC = CandidaterepoC;
  }

  Handle(command: any): void {
    switch (command.constructor) {
      case ApplyToOffer:
        const cmd: ApplyToOfferDTO = <ApplyToOfferDTO>command;
        const Oferta: Offer = this.Offerrepo.load(new OfferIdVO(cmd.OfferId));
        const Candidate: Candidate = this.CandidaterepoQ.getOne(
          cmd.CandidateId,
        );
        const DSApplyToOfer: ApplyToOffer = new ApplyToOffer(
          Candidate,
          Oferta,
          cmd.budget,
          cmd.description,
          cmd.time,
        );
        DSApplyToOfer.createApplication();
        this.Offerrepo.save(Oferta);
        this.CandidaterepoC.save(Candidate);
        break;
      default:
        throw new Error(
          `ApplyService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
