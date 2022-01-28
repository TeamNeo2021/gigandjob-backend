import { OfferIdVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { Offer } from '../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { DirectionVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { PublicationDateVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { Candidate } from '../../Dominio/AggRoots/Candidate/Candidate';
import {
  Sectors,
  SectorVO,
} from '../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import {
  OfferStatesEnum,
  OfferStateVO,
} from '../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { IApplicationService } from '.././Core/IApplicationService';
import { createOfferDTO } from '../DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../DTO/Offer/ReactivateOfferDTO';
import { EliminitedOfferDTO } from '../DTO/Offer/EliminitedOfferDTO';
import { IOfferRepository } from '../Repositories/OfferRepository.repo';
import { ReportOfferDTO } from '../DTO/Offer/ReportOffer.dto';
import { OfferReportVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferReportVO';
import { ICandidateRepository } from '../Repositories/CandidateRepository';
import { INotificationSender } from '../Ports/INotificationSender';
import { ApplyToOfferDTO } from '../DTO/Application/ApplyToOffer.dto';
import { CandidateApplied } from '../../Dominio/DomainEvents/CandidateEvents/CandidateApplied';
import { ApplyToOffer } from '../../Dominio/DomainService/ApplyToOffer';

export class OfferService implements IApplicationService {
  private readonly repository: IOfferRepository;
  private readonly Candidaterepo: ICandidateRepository;
  private readonly Sender: INotificationSender;

  constructor(
    repo: IOfferRepository,
    Candidaterepo: ICandidateRepository,
    Sender: INotificationSender,
  ) {
    this.repository = repo;
    this.Candidaterepo = Candidaterepo;
    this.Sender = Sender;
  }

  async Handle(command: any): Promise<void> {
    switch (command.constructor) {
      case createOfferDTO: {
        // cast command to get intellisense
        let cmd: createOfferDTO = <createOfferDTO>command;

        //! This is tresspassing aggregate offer
        //! by accesing directly to its VO's
        let new_offer = Offer.CreateOffer(
          new OfferStateVO(<OfferStatesEnum>(<unknown>cmd.State)),
          PublicationDateVO.Create(cmd.PublicationDate),
          RatingVO.Create(cmd.Rating),
          DirectionVO.Create(cmd.Direction),
          new SectorVO(<Sectors>(<unknown>cmd.Sector)),
          BudgetVO.Create(cmd.Budget),
          DescriptionVO.Create(cmd.Description),
        );

        //Save the new offer
        await this.repository.save(new_offer);

        break;
      }

      case ReactivateOfferDTO: {
        let cmd: ReactivateOfferDTO = <ReactivateOfferDTO>command;
        let Offer_Reactived = await this.repository.load(
          new OfferIdVO(cmd.id_offer),
        );
        Offer_Reactived.ReactivateOffer();
        await this.repository.save(Offer_Reactived);
        break;
      }

      case EliminitedOfferDTO: {
        let cmd: EliminitedOfferDTO = <EliminitedOfferDTO>command;
        let Offer_Eliminited = await this.repository.load(
          new OfferIdVO(cmd.id_offer),
        );
        Offer_Eliminited.EliminateOffer();
        await this.repository.save(Offer_Eliminited);
        break;
      }
      case ReportOfferDTO: {
        let cmd = command as ReportOfferDTO;
        const offer = await this.repository.load(new OfferIdVO(cmd.id));
        offer.ReportOffer(OfferReportVO.Create(cmd.reporterId, cmd.reason));
        await this.repository.save(offer);
        break;
      }
      case ApplyToOfferDTO:
        const cmd: ApplyToOfferDTO = <ApplyToOfferDTO>command;
        const Oferta: Offer = await this.repository
          .load(new OfferIdVO(cmd.OfferId))
          .catch((err) => {
            throw err;
          });
        console.log('Saque esta: ' + Oferta);
        const Candidate: Candidate = await this.Candidaterepo.getOne(
          cmd.CandidateId,
        );
        console.log('Saque este candidate:' + Candidate);
        //Domain service
        const DSApplyToOfer: ApplyToOffer = new ApplyToOffer(
          Candidate,
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
        this.repository.save(Oferta);
        this.Candidaterepo.modify(Candidate.Id.value, Candidate);
        break;
      // case LikeOffer:

      //     break;
      // case applyToOffer:

      //     break;

      default:
        throw new Error(
          `OfferService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
