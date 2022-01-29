import { Injectable } from '@nestjs/common';
import { Candidate, Candidate } from 'src/Dominio/AggRoots/Candidate/Candidate';
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
        const AMeeting:Meeting = translateDtoIntoMeeting(Mdto);
        AMeeting.Accept();
        this.repository.modifyMeeting()
        break;
      case RejectMeeting:
        //query meeting command.meetingId
        const cmd: AcceptMeeting = <AcceptMeeting>command;
        const Mdto: MeetingDTO = this.repository.getById(cmd.meetingId);
        const RMeeting:Meeting = translateDtoIntoMeeting(Mdto);
        AMeeting.Reject();
        this.repository.modifyMeeting()
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
      new MeetingStateVO(Mdto.state),
      new MeetingDescriptionVO(Mdto.description),
      new MeetingDateVO(Mdto.date),
      new MeetingLocationVO(Mdto.location),
      this.EmployerDtoIntoEmployer(Mdto.employer),
      this.CandidateDtoIntoCanditate(Mdto.candidate),
    );
    return meeting;
  }

  private EmployerDtoIntoEmployer(Edto: EmployerDTO): Employer {
    const employer: Employer = new Employer(
      new EmployerIdVO(),
      new EmployerNameVO(),
      new EmployerDescriptionVO(),
      new EmployerStateVO(),
      new EmployerLocationVO(),
      new EmployerRifVO(),
      new EmployerPhoneVO(),
      new EmployerMailVO(),
      new EmployerComercialDesignationVO(),
    );
    return employer.;
  }

  private CandidateDtoIntoCanditate(Cdto: CandidateDTO): Candidate {
    const candidate: Candidate = new Candidate();
    return candidate;
  }
}
