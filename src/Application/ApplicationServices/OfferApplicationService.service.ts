import { CandidateApplied } from 'src/Dominio/DomainEvents/CandidateEvents/CandidateApplied';
import { Candidate } from '../../Dominio/AggRoots/Candidate/Candidate';
import { Offer } from '../../Dominio/AggRoots/Offer/Offer';
import { OfferIdVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { ApplyToOffer } from '../../Dominio/DomainService/ApplyToOffer';
import { IApplicationService } from '../Core/IApplicationService';
import { ApplyToOfferDTO } from '../DTO/Application/ApplyToOffer.dto';
import { INotificationSender } from '../Ports/INotificationSender';
import { ICandidateRepository } from '../Repositories/CandidateRepository';
import { IOfferRepository } from '../Repositories/OfferRepository.repo';

export class OfferApplicationService implements IApplicationService {
  private readonly Offerrepo: IOfferRepository;
  private readonly Candidaterepo: ICandidateRepository;
  private readonly Sender: INotificationSender;

  constructor(
    Offerrepo: IOfferRepository,
    Candidaterepo: ICandidateRepository,
    Sender: INotificationSender,
  ) {
    this.Offerrepo = Offerrepo;
    this.Candidaterepo = Candidaterepo;
    this.Sender = Sender;
  }

  async Handle(command: any): Promise<void> {
    switch (command.constructor) {
      case ApplyToOfferDTO:
        const cmd: ApplyToOfferDTO = <ApplyToOfferDTO>command;
        const Oferta: Offer = await this.Offerrepo.load(
          new OfferIdVO(cmd.OfferId),
        ).catch((err) => {
          throw err;
        });
        console.log('Saque esta: ' + Oferta);
        const Candidate: Promise<Candidate> = this.Candidaterepo.getOne(
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
        try {
          this.Sender.send(
            cmd.EmployerId,
            new CandidateApplied(
              cmd.CandidateId,
              cmd.OfferId,
              cmd.budget,
              cmd.description,
              cmd.time,
            ),
          );
        } catch (error) {
          throw error;
        }
        this.Offerrepo.save(Oferta);
        this.Candidaterepo.save(await Candidate);
        break;
      default:
        throw new Error(
          `ApplyService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
