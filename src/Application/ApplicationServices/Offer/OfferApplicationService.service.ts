import { OfferIdVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { Offer } from '../../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { DirectionVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { PublicationDateVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import {
  Sectors,
  SectorVO,
} from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import {
  OfferStatesEnum,
  OfferStateVO,
} from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { IApplicationService } from '../.././Core/IApplicationService';
import { createOfferDTO } from '../../DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../DTO/Offer/ReactivateOfferDTO';
import { EliminatedOfferDTO } from '../../DTO/Offer/EliminatedOfferDTO';
import { IOfferRepository } from '../../Repositories/OfferRepository.repo';
import { ReportOfferDTO } from '../../DTO/Offer/ReportOffer.dto';
import { OfferReportVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferReportVO';

import { INotificationSender } from '../../Ports/INotificationSender';
import { ICandidateRepository } from '../../Repositories/CandidateRepository';
import { ApplyToOffer } from '../../../Dominio/DomainService/ApplyToOffer';
import { CandidateApplied } from '../../../Dominio/DomainEvents/CandidateEvents/CandidateApplied';
import { Candidate } from '../../../Dominio/AggRoots/Candidate/Candidate';
import { CompletedOfferDTO } from 'src/Application/DTO/Offer/CompletedOfferDTO';
import { ApplicantHired } from 'src/Dominio/DomainService/ApplicantHired';

export class OfferApplicationService implements IApplicationService {
  private readonly Offerrepo: IOfferRepository;
  private readonly CandidaterepoC: ICandidateRepository;
  private readonly Sender: INotificationSender;

  private readonly DB_error: Error = new Error('A database error has ocurred');

  constructor(
    Offerrepo: IOfferRepository,
    CandidaterepoC: ICandidateRepository,
    Sender: INotificationSender,
  ) {
    this.Offerrepo = Offerrepo;
    this.CandidaterepoC = CandidaterepoC;
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

        //This should never happen, but in case RandomUUID generates
        //an used UUID, this will stop the creation
        if (
          await this.Offerrepo.exists(new_offer._Id).catch((err) => {
            throw this.DB_error;
          })
        ) {
          throw new Error('This offer ID generation has failed');
        }

        //Save the new offer
        await this.Offerrepo.save(new_offer).catch((err) => {
          throw this.DB_error;
        });

        break;
      }

      case ReactivateOfferDTO: {
        let cmd: ReactivateOfferDTO = <ReactivateOfferDTO>command;
        let Offer_Reactived = await this.Offerrepo.load(
          new OfferIdVO(cmd.id_offer),
        );
        Offer_Reactived.ReactivateOffer();
        await this.Offerrepo.save(Offer_Reactived);
        break;
      }

      case EliminatedOfferDTO: {
        let cmd: EliminatedOfferDTO = <EliminatedOfferDTO>command;
        let Offer_Eliminited = await this.Offerrepo.load(
          new OfferIdVO(cmd.id_offer),
        );
        Offer_Eliminited.EliminateOffer();
        await this.Offerrepo.save(Offer_Eliminited);
        break;
      }
      case ReportOfferDTO: {
        let cmd = command as ReportOfferDTO;
        const offer = await this.Offerrepo.load(new OfferIdVO(cmd.id));
        offer.ReportOffer(OfferReportVO.Create(cmd.reporterId, cmd.reason));
        await this.Offerrepo.save(offer);
        break;
      }
        case LikeOfferDTO:
       {
        const cmd: LikeOfferDTO =  < LikeOfferDTO> command;
        const offer = await this.Offerrepo.likeOffer(cmd);
        console.log('Liked offer: ', cmd.id_offer, ' candidate: ', cmd.id_candidate);
        //todo ver que se hace aqui

        break;
       }
      case ApplyToOfferDTO:
        const cmd: ApplyToOfferDTO = <ApplyToOfferDTO>command;
        const Oferta: Offer = await this.Offerrepo.load(
          new OfferIdVO(cmd.offerId),
        ).catch((err) => {
          throw err;
        });
        console.log('Saque esta: ' + Oferta);
        const Candidate: Candidate = await this.CandidaterepoC.getOne(
          cmd.candidateId,
        );
        console.log('Saque este candidate:' + Candidate);
        const DSApplyToOfer: ApplyToOffer = new ApplyToOffer(
          await Candidate,
          Oferta,
          cmd.budget,
          cmd.description,
          cmd.duration_days,
        );
        DSApplyToOfer.createApplication();
        try {
          this.Sender.send(
            cmd.employerId,
            new CandidateApplied(
              cmd.candidateId,
              cmd.offerId,
              cmd.budget,
              cmd.description,
              cmd.duration_days,
            ),
          );
        } catch (error) {
          throw error;
        }
        this.Offerrepo.save(Oferta);
        this.CandidaterepoC.modify(Candidate.id, Candidate);
        break;
        case CompletedOfferDTO:
          const hired: CompletedOfferDTO = <CompletedOfferDTO>command;
          const Offer_Completed = await this.Offerrepo.load(
            new OfferIdVO,
          );
          let applicationHired: ApplicantHired;
          applicationHired.CandidateContract(Offer_Completed);
          await this.Offerrepo.save(Offer_Completed);
        break;      
      //     break;

      case SuspendOfferDTO:{
        let cmd: SuspendOfferDTO = <SuspendOfferDTO>command;
        let Offer_Suspended = await this.Offerrepo.load(
          new OfferIdVO(cmd.id_offer),
        );
        Offer_Suspended.SuspendOffer(false);
        await this.Offerrepo.save(Offer_Suspended);
        break;
      }

      default:
        throw new Error(
          `OfferService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
