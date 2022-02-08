import { application } from "express";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerComercialDesignationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";
import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerIdVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO";
import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerMailVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerNameVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerPhoneVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo";
import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerStates, EmployerStateVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { Meeting } from "src/Dominio/AggRoots/Meeting/Meeting";
import { MeetingDateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingDescriptionVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO";
import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingLocationVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO";
import { MeetingStates, MeetingStateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { Application } from "src/Dominio/AggRoots/Offer/Application/Application";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferLocationVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { OfferReportVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferReportVO";
import { Sectors, SectorVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { ApplicationDTO } from "../DTO/Application/ApplicationDTO.dto";
import { CandidateDTO } from "../DTO/Candidate/Candidate.dto";
import { CreateEmployerDTO } from "../DTO/Employer/CreateEmployer";
import { EmployerDTO } from "../DTO/Employer/Employer.dto";
import { LocationDTO } from "../DTO/Location.dto";
import { MeetingDTO } from "../DTO/Meeting/Meeting.dto";
import { ModifyMeetingDTO } from "../DTO/Meeting/modifyMeetingDTO";
import { createOfferDTO } from "../DTO/Offer/CreateOffer.dto";
import { OfferDTO } from "../DTO/Offer/OfferDTO";

export class EntitiesFactory {  //wpuld like to refactor to FromDTOtoEntity and create a FromEntityToDTO

  
     /**
       * Returns a Meeting given a Meeting DTO
       * @param {MeetingDTO} Mdto
       * @returns {Meeting}
       */
    static fromMeetingDtotoMeeting(Mdto: MeetingDTO): Meeting {
        const meeting: Meeting = new Meeting(
          new MeetingIDVO(Mdto.id),
          new MeetingStateVO(MeetingStates[Mdto.state]),
          new MeetingDescriptionVO(Mdto.description),
          new MeetingDateVO(Mdto.date),
          new MeetingLocationVO(
           Mdto.location.latitude , Mdto.location.longitude,
          ),
          this.fromEmployerDtoToEmployer(Mdto.employer),
          this.fromCandidateDtoToCanditate(Mdto.candidate),
        );
        return meeting;
      }

      /**
       * Returns a Meeting DTO given a Meeting 
       * @param {Meeting} meeting
       * @returns {MeetingDTO}
       */

      static fromMeetingToMeetingDTO(meeting: Meeting): MeetingDTO {
        const meetingDTO = new MeetingDTO(
          {
            id : meeting.id._id,
            state : meeting.state.current,
            description : meeting.description.value,
            date : meeting.date.value,
            location : {
              latitude : meeting.location.latitude,
              longitude: meeting.location.longitude
            },
            employer : this.fromEmployerToEmployerDTO(meeting.employer),
            candidate : this.fromCandidateToCandidateDTO(meeting.candidate),
          }
        );
        return meetingDTO;

      }



    
         /**
       * Returns an Employer instance given an EmployerDTO
       * @param {EmployerDTO} employerDTO
       * @returns {Employer}
       */ 
    
      static fromEmployerDtoToEmployer(employerDTO: CreateEmployerDTO): Employer {
        const employer: Employer =  Employer.RegisterEmployer(
           EmployerNameVO.Unsafe(employerDTO.name),
           EmployerDescriptionVO.Unsafe (employerDTO.description), 
           new EmployerStateVO (EmployerStates[employerDTO.state]),
           new EmployerLocationVO (employerDTO.location.latitude, employerDTO.location.longitude),
           EmployerRifVO.Unsafe (employerDTO.rif),
           EmployerPhoneVO.Unsafe (employerDTO.phone),
           EmployerMailVO.Unsafe( employerDTO.mail),
           EmployerComercialDesignationVO.Unsafe (employerDTO.comDesignation)
        );
        return employer;
      }

    /**
       * Returns an EmployerDTO given an Employer instance
       * @param {Employer} employer
       * @returns {EmployerDTO}
       */

      static fromEmployerToEmployerDTO(employer: Employer): EmployerDTO{
        const employerDTO: EmployerDTO =  new EmployerDTO(
          {
              employerId : employer.employerId,
              name : employer.name,
              description : employer.description,
              state : employer.state,
              location : employer.location,
              rif : employer.rif,
              phone : employer.phone,
              mail : employer.mail,
              comDesignation : employer.comDesignation,
              offers : [],
          }
        );
        return employerDTO;
      }


          /**
       * Returns an CandidateDTO given an Candidate instance
       * @param {Candidate} employer
       * @returns {CandidateDTO}
       */
      static fromCandidateToCandidateDTO(candidate: Candidate): CandidateDTO{
        const candidateDTO: CandidateDTO =  new CandidateDTO(
          {
              candidateId : candidate.Id,
              name : candidate.name,
              state : candidate.state,
              location : candidate.location,
              phone : candidate.phone,
              mail : candidate.email
          }
        );
        return candidateDTO;
      }

         /**
       * Returns a Candidate given an Candidate DTO
       * @param {CandidateDTO} candidateDto
       * @returns {Candidate}
       */
      static fromCandidateDtoToCanditate(candidateDto: CandidateDTO): Candidate {
        const candidate: Candidate = new Candidate(
          new CandidateIdVo(candidateDto.candidateId),
          new CandidateStateVo(CandidateStatesEnum[candidateDto.state]),
          new CandidateFullNameVo(candidateDto.name.split(" ")[0],candidateDto.name.split(" ")[1]),
          new CandidatePhoneVo(candidateDto.phone.toString().slice(0,4), candidateDto.phone.toString().slice(4)),
          new CandidateEmailVo(candidateDto.email),
          new CandidateBirthDateVo(candidateDto.birthDate),
          new CandidateLocationVo(candidateDto.location.latitude, candidateDto.location.longitude),

        );
        return candidate;
      }
    

      
      static fromMeetingToModifyMeetingDTO(Meeting: Meeting): ModifyMeetingDTO {
        const MMDto: ModifyMeetingDTO = new ModifyMeetingDTO(
          Meeting.id._id as string, //todo esto debe ser refactorizado
          Meeting.state.current.toString(),
          Meeting.description.value,
          Meeting.date.value,
          this.fromMeetingLocationVOToLocationDTO(Meeting.location),
        );
        return;
      }

      


      //FROM ENTITY TO DTO
    
      static fromMeetingLocationVOToLocationDTO(
        meetingLocation: MeetingLocationVO,
      ): LocationDTO {
        const locationDTO = new LocationDTO(meetingLocation);
        return locationDTO;
      }


      //OFFER 
 
/**
       * Use it when instantiating an Offer from an Response
       * 
       * @param OfferDTO 
       * @returns Offer
       */
      static fromOfferDTOtoOffer(OfferDTO: OfferDTO): Offer {
        const offer: Offer = new Offer(
          new OfferIdVO(OfferDTO.OfferId),
          new OfferStateVO(OfferDTO.State),
          PublicationDateVO.Unsafe(OfferDTO.PublicationDate),
          RatingVO.Unsafe(OfferDTO.Rating),
          new OfferLocationVO(OfferDTO.Direction.latitude, OfferDTO.Direction.longitude),
          new SectorVO(OfferDTO.Sector),
          BudgetVO.Unsafe(OfferDTO.Budget),
          DescriptionVO.Unsafe(OfferDTO.Description),
          OfferDTO.reports.map(r => OfferReportVO.Unsafe(r.reporterId, r.reason)),
        );

        OfferDTO.applications.forEach(app => {
          offer.unsafeCreateApplication(
            app.applicationId,
            app.candidateId,
            app.budget,
            app.description,
            app.duration_days,
            app.state,
            app.previous_state
          )
        })

        return offer;
      }

      /**
       * Use it when creating a new Offer
       * 
       * @param createOfferDTO 
       * @returns Offer
       */
      static fromCreateOfferDTOtoOffer(OfferDTO: createOfferDTO): Offer { //PILAS ESTO ES PARA CREAR UN OFFER
        const offer: Offer =  Offer.CreateOffer(
          // new OfferIdVO(OfferDTO.OfferId),
          new OfferStateVO(OfferStatesEnum[OfferDTO.State]),
          PublicationDateVO.Unsafe(OfferDTO.PublicationDate),
          RatingVO.Unsafe(OfferDTO.Rating),
          new OfferLocationVO(OfferDTO.Direction.latitude, OfferDTO.Direction.longitude),
          new SectorVO(Sectors[OfferDTO.Sector]),
          BudgetVO.Unsafe(OfferDTO.Budget),
          DescriptionVO.Unsafe(OfferDTO.Description),
        );
        return offer;
      }

         /**
       * Use it to translate from a Offer to an OfferDTO to save it in a DB or to send it in a request
       * 
       * @param Offer
       * @returns OfferDTO
       */

      static fromOfferToOfferDTO(offer: Offer): OfferDTO {
        const newOfferDto: OfferDTO = new OfferDTO({
          OfferId: offer._Id._value,
          State:  offer._State.state,
          PublicationDate: offer._PublicationDate.value,
          Rating: offer._Rating.value,
          Direction: offer._Direction,
          Sector:  offer._Sector.value,
          Budget:   offer._Budget.value,
          Description: offer._Description.value,
          reports: offer.Reports.map(r => ({ ...r })),
          applications: offer._application.map(application => new ApplicationDTO({
            applicationId: application.id.value,
            state: application.state.current,
            candidateId: application.candidateId.value,
            previous_state: application.previous_state?.current,
            budget: application.budget.value,
            description: application.description.value,
            duration_days: application.time.days,
          }))
        }
        );
        return newOfferDto;
      }


}