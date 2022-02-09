import { OfferIdVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { Offer } from '../../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferLocationVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
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
import { CompletedOfferDTO } from '../../DTO/Offer/CompletedOfferDTO';
import { ApplicantHired } from '../../../Dominio/DomainService/ApplicantHired';
import { SuspendOfferDTO } from '../../DTO/Offer/SuspendOffer.dto';
import { EmployerRepository } from '../../Repositories/Employer/repository.interface';
import { LikeOfferDTO } from '../../DTO/Offer/LikeOfferDTO.dto';
import { ApplyToOfferDTO } from '../../DTO/Application/ApplicationDTO.dto';
import { EntitiesFactory } from '../../Core/EntitiesFactory.service';
import { EliminateOfferFromEmployerEliminatedDTO } from '../../DTO/Offer/EliminateOfferFromEmployerEliminatedDTO';
import { EliminateApplicationFromCandidateDTO } from '../..//DTO/Offer/EliminateApplicationFromCandidate.dto';
import { OfferCompleted } from 'src/Dominio/DomainEvents/OfferEvents/OfferCompleted';

export class OfferApplicationService implements IApplicationService {
  private readonly Offerrepo: IOfferRepository;
  private readonly CandidaterepoC: ICandidateRepository;
  private readonly Employerrepo: EmployerRepository;
  private readonly Sender: INotificationSender;

  private readonly DB_error: Error = new Error('A database error has ocurred');

  constructor(
    Offerrepo: IOfferRepository,
    CandidaterepoC: ICandidateRepository,
    Employerrepo: EmployerRepository,
    Sender: INotificationSender,
  ) {
    this.Offerrepo = Offerrepo;
    this.CandidaterepoC = CandidaterepoC;
    this.Employerrepo = Employerrepo;
    this.Sender = Sender;
  }

  async Handle(command: any): Promise<void> {
    switch (command.constructor) {
      case createOfferDTO: {
        // cast command to get intellisense
        const cmd: createOfferDTO = <createOfferDTO>command;

        //! This is tresspassing aggregate offer
        //! by accesing directly to its VO's
        const new_offer = EntitiesFactory.fromCreateOfferDTOtoOffer(cmd); //At this point the CreatedOfferEvent is made

        //This should never happen, but in case RandomUUID generates
        //an used UUID, this will stop the creation
        if (
          await this.Offerrepo.exists(new_offer._Id._value).catch((err) => {
            console.log('OfferApplicationService CREATE OFFER Error', err);
            throw this.DB_error;
          })
        ) {
          console.log('THIS OFFER ALREADY EXIST');
          throw new Error('This offer ID generation has failed');
        }

        //Save the new offer
        await this.Offerrepo.save(
          EntitiesFactory.fromOfferToOfferDTO(new_offer),
        ).catch((err) => {
          throw this.DB_error;
        });

        break;
      }

      case ReactivateOfferDTO: {
        const cmd: ReactivateOfferDTO = <ReactivateOfferDTO>command;
        const offerReactived = await this.Offerrepo.getOfferById(cmd.id_offer);
        const newOffer = EntitiesFactory.fromOfferDTOtoOffer(offerReactived);
        newOffer.ReactivateOffer();
        await this.Offerrepo.save(
          EntitiesFactory.fromOfferToOfferDTO(newOffer),
        );
        break;
      }

      case EliminatedOfferDTO: {
        const cmd: EliminatedOfferDTO = <EliminatedOfferDTO>command;
        const Offer_Eliminated = await this.Offerrepo.getOfferById(
          cmd.id_offer,
        );
        if (Offer_Eliminated) {
          const newOffer =
            EntitiesFactory.fromOfferDTOtoOffer(Offer_Eliminated);
          newOffer.EliminateOffer();
          await this.Offerrepo.save(
            EntitiesFactory.fromOfferToOfferDTO(newOffer),
          );
        }
        break;
      }

      case ReportOfferDTO: {
        const cmd: ReportOfferDTO = <ReportOfferDTO>command;
        const Offer_Reported = await this.Offerrepo.getOfferById(cmd.id);
        const newOffer = EntitiesFactory.fromOfferDTOtoOffer(Offer_Reported);
        newOffer.ReportOffer(OfferReportVO.Create(cmd.reporterId, cmd.reason));
        await this.Offerrepo.save(
          EntitiesFactory.fromOfferToOfferDTO(newOffer),
        );
        break;
      }

      case EliminateOfferFromEmployerEliminatedDTO: {
        const cmd: EliminateOfferFromEmployerEliminatedDTO = <
          EliminateOfferFromEmployerEliminatedDTO
        >command;
        const employer = await this.Employerrepo.get(cmd.id_employer);
        for (const offer of employer.offers) {
          //revisar esto
          const NewOffer = EntitiesFactory.fromOfferDTOtoOffer(offer);
          NewOffer.EliminateOffer();
          const SaveOffer = EntitiesFactory.fromOfferToOfferDTO(NewOffer);
          await this.Offerrepo.save(SaveOffer);
        }

        break;
      }

      case EliminateApplicationFromCandidateDTO: {
        const cmd: EliminateApplicationFromCandidateDTO = <
          EliminateApplicationFromCandidateDTO
        >command;
        const offers = await this.Offerrepo.getAll();
        for (const offer of offers) {
          const newOffer = EntitiesFactory.fromOfferDTOtoOffer(offer);
          for (const application of newOffer._application) {
            if (application.getCandidateId.toString() == cmd.id_candidate) {
              newOffer.EliminateApplication(application);
            }
          }
          const fOffer = EntitiesFactory.fromOfferToOfferDTO(newOffer);
          await this.Offerrepo.save(fOffer);
        }
      }

      case LikeOfferDTO: {
        const cmd: LikeOfferDTO = <LikeOfferDTO>command;
        const offer = await this.Offerrepo.likeOffer(cmd);
        console.log(
          'Liked offer: ',
          cmd.id_offer,
          ' candidate: ',
          cmd.id_candidate,
        );
        //todo ver que se hace aqui

        break;
      }
      case ApplyToOfferDTO: {
        const cmd: ApplyToOfferDTO = <ApplyToOfferDTO>command;
        let Offer_Applied = await this.Offerrepo.getOfferById(cmd.offerId);
        const newOffer = EntitiesFactory.fromOfferDTOtoOffer(Offer_Applied);
        console.log('Saque esta: ' + Offer_Applied);
        const Candidate: Candidate = await this.CandidaterepoC.getOne(
          cmd.candidateId,
        );
        console.log('Saque este candidate:' + Candidate);
        const DSApplyToOfer: ApplyToOffer = new ApplyToOffer(
          await Candidate,
          newOffer,
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
        Offer_Applied = EntitiesFactory.fromOfferToOfferDTO(newOffer);
        this.Offerrepo.save(Offer_Applied);
        this.CandidaterepoC.modify(Candidate.id, Candidate);
        break;
      }
      case CompletedOfferDTO: {
        const hired: CompletedOfferDTO = <CompletedOfferDTO>command;
        const Offer_Completed = await this.Offerrepo.getOfferById(
          new OfferIdVO().value,
        );
        const newOfferCompleted =
          EntitiesFactory.fromOfferDTOtoOffer(Offer_Completed);
        let applicationHired: ApplicantHired;
        applicationHired.CandidateContract(newOfferCompleted);

        try {
          this.Sender.send(hired.id_offer, new OfferCompleted());
        } catch (error) {
          throw error;
        }
        await this.Offerrepo.save(Offer_Completed);
        break;

        /*applicationHired.CandidateContract(newOfferCompleted);
        Offer_Completed =
          EntitiesFactory.fromOfferToOfferDTO(newOfferCompleted);
        await this.Offerrepo.save(Offer_Completed);
        break;*/
      }
      //     break;

      case SuspendOfferDTO: {
        const cmd: SuspendOfferDTO = <SuspendOfferDTO>command;
        let Offer_Suspended = await this.Offerrepo.getOfferById(cmd.id_offer);
        const NewOffer = EntitiesFactory.fromOfferDTOtoOffer(Offer_Suspended);
        NewOffer.SuspendOffer(false);
        Offer_Suspended = EntitiesFactory.fromOfferToOfferDTO(NewOffer);
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
