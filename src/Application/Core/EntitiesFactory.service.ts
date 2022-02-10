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
import { User } from "src/Dominio/AggRoots/User/user.root";
import { UserId } from "src/Dominio/AggRoots/User/ValueObjects/userId.object";
import { UserMail } from "src/Dominio/AggRoots/User/ValueObjects/userMail.object";
import { UserPassword } from "src/Dominio/AggRoots/User/ValueObjects/userPassword.object";
import { ApplicationDTO } from "../DTO/Application/ApplicationDTO.dto";
import { CandidateDTO } from "../DTO/Candidate/Candidate.dto";
import { CreateEmployerDTO } from "../DTO/Employer/CreateEmployer";
import { EmployerDTO } from "../DTO/Employer/Employer.dto";
import { LocationDTO } from "../DTO/Location.dto";
import { MeetingDTO } from "../DTO/Meeting/Meeting.dto";
import { ModifyMeetingDTO } from "../DTO/Meeting/modifyMeetingDTO";
import { createOfferDTO } from "../DTO/Offer/CreateOffer.dto";
import { OfferDTO } from "../DTO/Offer/OfferDTO";
import { UserDTO } from "../DTO/User/User.dto";
/*import { Candidate } from 'src/Dominio/AggRoots/Candidate/Candidate';
import { CandidateIdVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { Employer } from 'src/Dominio/AggRoots/Employer/Employer';
import { EmployerIdVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingDateVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO';
import { MeetingDescriptionVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingIDVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO';
import {
  MeetingStates,
  MeetingStateVO,
} from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { CandidateDTO } from '../DTO/Candidate.dto';
import { EmployerDTO } from '../DTO/Employer.dto';
import { LocationDTO } from '../DTO/Location.dto';
import { MeetingDTO } from '../DTO/Meeting/Meeting.dto';
import { ModifyMeetingDTO } from '../DTO/Meeting/modifyMeetingDTO';*/

export class EntitiesFactory {
  //wpuld like to refactor to FromDTOtoEntity and create a FromEntityToDTO

  
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
    
      static fromEmployerDtoToEmployer(employerDTO: EmployerDTO): Employer {
        const employer: Employer =  Employer.Unsafe(
           (employerDTO.employerId),
           (employerDTO.name),
           (employerDTO.description), 
           (EmployerStates[employerDTO.state]),
           (employerDTO.location.latitude),
           (employerDTO.location.longitude),
           (employerDTO.rif),
           (employerDTO.phone),
           (employerDTO.mail),
           (employerDTO.comDesignation),
           (employerDTO.offers.map(EntitiesFactory.fromOfferDTOtoOffer))

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
              employerId : employer.employerId.guid_value,
              name : employer.name.value_name_employer,
              description : employer.description.value_employer_description,
              state : employer.state.value_state,
              location : employer.location,
              rif : employer.rif.value_employer_rif,
              phone : employer.phone.value_employer_phone,
              mail : employer.mail.value_employer_mail,
              comDesignation : employer.comDesignation.value_comercial_designation,
              offers : employer.offers.map(EntitiesFactory.fromOfferToOfferDTO),
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
              candidateId : candidate.Id.value,
              name: candidate.name.names.valueOf(),
              lastname: candidate.name.lastNames.valueOf(),
              state : candidate.state.state,
              location: {
                latitude: candidate.location.latitude.valueOf(),
                longitude: candidate.location.longitude.valueOf()
              },
              phone: candidate.phone.areaCode.valueOf() + candidate.phone.phoneNumber.valueOf(),
              email: candidate.email.email.valueOf(),
              birthdate: candidate.birthDay.birthDate
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
          new CandidatePhoneVo(candidateDto.phone.slice(0,4), candidateDto.phone.slice(5)),
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
    return MMDto;
  }

  //FROM ENTITY TO DTO

  static fromUserDTOToUser(dto: UserDTO) {
    return new User(
      new UserId(dto.id),
      new UserPassword(dto.password),
      new UserMail(dto.email)
    )
  }

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
       * @param offerDTO 
       * @returns Offer
       */
      static fromOfferDTOtoOffer(offerDTO: OfferDTO): Offer {
        console.log("estoy en fromODTO")
        console.log(offerDTO)
        console.log(offerDTO.Direction.latitude)
        console.log(offerDTO.Direction)
        console.log(offerDTO.PublicationDate)
        let clean_latitude: number;
        let clean_longitude: number;

        //Lets clean Direction
        if(!offerDTO.Direction['_latitude']){
          clean_latitude = offerDTO.Direction.latitude
        }else{
          clean_latitude = offerDTO.Direction['_latitude']
        };
        if(!offerDTO.Direction['_longitude']){
          clean_longitude = offerDTO.Direction.longitude
        }else{
          clean_longitude = offerDTO.Direction['_longitude']
        }

        const offer: Offer = new Offer(
          new OfferIdVO(offerDTO.OfferId),
          new OfferStateVO(offerDTO.State),
          PublicationDateVO.Unsafe(offerDTO.PublicationDate),
          RatingVO.Unsafe(offerDTO.Rating),
          new OfferLocationVO(clean_latitude, clean_longitude),
          new SectorVO(offerDTO.Sector),
          BudgetVO.Unsafe(offerDTO.Budget),
          DescriptionVO.Unsafe(offerDTO.Description),
          offerDTO.reports.map(r => OfferReportVO.Unsafe(r.reporterId, r.reason)),
        )
        console.log("sali de fromODTO");

        offerDTO.applications.forEach(app => {
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
        return new OfferDTO({
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
        });
      }


}
