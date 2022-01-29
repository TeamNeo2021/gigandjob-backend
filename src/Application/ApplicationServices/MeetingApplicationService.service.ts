import { Injectable } from '@nestjs/common';
import { Candidate } from 'src/Dominio/AggRoots/Candidate/Candidate';
import { CandidateIdVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { Employer } from 'src/Dominio/AggRoots/Employer/Employer';
import { EmployerComercialDesignationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo';
import { EmployerDescriptionVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO';
import { EmployerIdVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';
import { EmployerLocationVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO';
import { EmployerMailVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo';
import { EmployerNameVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo';
import { EmployerPhoneVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo';
import { EmployerRifVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO';
import { EmployerStateVO } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingDateVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO';
import { MeetingDescriptionVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingIDVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO';
import {
  MeetingStates,
  MeetingStateVO,
} from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';
import { MeetingDTO } from '../DTO/Meeting/Meeting.dto';

import { RejectMeeting } from '../DTO/Meeting/rejectMeetingDTO';
import { IMeetingRepository } from '../Repositories/MeetingRepository.repo';

@Injectable()
export class MeetingApplicationService implements IApplicationService {
  private repository: IMeetingRepository;
  constructor(repository: IMeetingRepository) {
    this.repository = repository;
  }
  Handle(command: any): void {
    switch (command.constructor) {
      case AcceptMeeting:
        //agendar en calendario
        const cmd: AcceptMeeting = <AcceptMeeting>command;
        const Mdto: MeetingDTO = this.repository.getById(cmd.meetingId);
        const AMeeting: Meeting = this.MeetingDtoIntoMeeting(Mdto);
        AMeeting.Accept();
        const MMdto: ModifyMeetingDTO =
          this.MeetingIntoModifyMeetingDTO(AMeeting);
        this.repository.modifyMeeting(MMdto);
        break;
      case RejectMeeting:
        //query meeting command.meetingId
        const cmd2: AcceptMeeting = <AcceptMeeting>command;
        const Mdto2: MeetingDTO = this.repository.getById(cmd2.meetingId);
        const RMeeting: Meeting = this.MeetingDtoIntoMeeting(Mdto2);
        RMeeting.Reject();
        const MMdto2: ModifyMeetingDTO =
          this.MeetingIntoModifyMeetingDTO(RMeeting);
        this.repository.modifyMeeting(MMdto2);
        break;
      default:
        throw new Error(
          `MeetingService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }

  private MeetingDtoIntoMeeting(Mdto: MeetingDTO): Meeting {
    const meeting: Meeting = new Meeting(
      new MeetingIDVO(Mdto.id),
      new MeetingStateVO(MeetingStates[Mdto.state]),
      new MeetingDescriptionVO(Mdto.description),
      new MeetingDateVO(Mdto.date),
      new MeetingLocationVO(
        '' + Mdto.location.latitude + ' , ' + Mdto.location.longitude,
      ),
      this.EmployerDtoIntoEmployer(Mdto.employer),
      this.CandidateDtoIntoCanditate(Mdto.candidate),
    );
    return meeting;
  }

  /*Estos constructores vacíos son temporales, el servicio puede funcionar de esta forma
  ya que no necesita los datos del employer ni del candidate perteneciente a la oferta
  en ningun momento, sin embargo buscaremos mas adelante buscaremos una solción mas segura*/
  private EmployerDtoIntoEmployer(Edto: EmployerDTO): Employer {
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

  private CandidateDtoIntoCanditate(Cdto: CandidateDTO): Candidate {
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

  private MeetingIntoModifyMeetingDTO(Meeting: Meeting): ModifyMeetingDTO {
    const MMDto: ModifyMeetingDTO = new ModifyMeetingDTO(
      Meeting.id._id,
      Meeting.state.current.toString(),
      Meeting.description.value,
      Meeting.date.value,
      this.MeetingLocationVOIntoLocationDTO(Meeting.location),
    );
    return;
  }

  private MeetingLocationVOIntoLocationDTO(
    MLVO: MeetingLocationVO,
  ): LocationDTO {
    const LDTO = new LocationDTO(MLVO.getValue());
    return LDTO;
  }
}
