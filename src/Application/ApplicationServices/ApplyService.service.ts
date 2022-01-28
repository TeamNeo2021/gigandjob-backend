import { Candidate } from '../../Dominio//AggRoots/Candidate/Candidate';
import { Offer } from '../../Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { ApplyToOffer } from '../../Dominio/DomainService/ApplyToOffer';
import { IApplicationService } from '../Core/IApplicationService';
import { ApplyToOfferDTO } from '../DTO/Application/ApplyToOffer.dto';
import { ICandidateRepository } from '../Repositories/CandidateRepository';
import { IOfferRepository } from '../Repositories/OfferRepository.repo';

export class ApplyService implements IApplicationService {
  private readonly Offerrepo: IOfferRepository;
  private readonly CandidaterepoC: ICandidateRepository;

  constructor(
    Offerrepo: IOfferRepository,
    CandidaterepoC: ICandidateRepository,
  ) {
    this.Offerrepo = Offerrepo;
    this.CandidaterepoC = CandidaterepoC;
  }

  async Handle(command: any): Promise<void> {
    switch (command.constructor) {
      case ApplyToOfferDTO:
        const cmd: ApplyToOfferDTO = <ApplyToOfferDTO>command;
        const Oferta: Offer = await this.Offerrepo.load(
          new OfferIdVO(cmd.OfferId),
        );
        console.log('Saque esta: ' + Oferta);
        const Candidate: Promise<Candidate> = this.CandidaterepoC.getOne(
          cmd.CandidateId,
        );
        console.log('Saque este candidate:' + Candidate);
        const DSApplyToOfer: ApplyToOffer = new ApplyToOffer(
          await Candidate,
          Oferta,
          cmd.budget,
          cmd.description,
          cmd.time,
        );
        DSApplyToOfer.createApplication();
        this.Offerrepo.save(Oferta);
        this.CandidaterepoC.save(await Candidate);
        break;
      default:
        throw new Error(
          `ApplyService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
