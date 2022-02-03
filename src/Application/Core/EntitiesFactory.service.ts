import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerIdVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO";
import { Meeting } from "src/Dominio/AggRoots/Meeting/Meeting";
import { MeetingDateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingDescriptionVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO";
import { MeetingIDVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO";
import { MeetingLocationVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO";
import { MeetingStates, MeetingStateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO";
import { MeetingDTO } from "../DTO/Meeting/Meeting.dto";

export class EntitiesFactory {  //wpuld like to refactor to FromDTOtoEntity and create a FromEntityToDTO

  

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
    
      /*Estos constructores vacíos son temporales, el servicio puede funcionar de esta forma
      ya que no necesita los datos del employer ni del candidate perteneciente a la oferta
      en ningun momento, sin embargo buscaremos mas adelante buscaremos una solción mas segura*/
      static fromEmployerDtoToEmployer(Edto: EmployerDTO): Employer {
        const employer: Employer = new Employer(
          new EmployerIdVO(),
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        );
        return employer;
      }
    
      static fromCandidateDtoToCanditate(Cdto: CandidateDTO): Candidate {
        const candidate: Candidate = new Candidate(
          new CandidateIdVo(Cdto.id),
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
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
        MLVO: MeetingLocationVO,
      ): LocationDTO {
        const LDTO = new LocationDTO(MLVO.latitude, MLVO.longitude);
        return LDTO;
      }

}