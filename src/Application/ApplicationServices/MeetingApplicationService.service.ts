import { Injectable } from '@nestjs/common';
import { Candidate } from 'src/Dominio/AggRoots/Candidate/Candidate';
import { CandidateIdVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
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
        const dtoMeeting: MeetingDTO = this.repository.getById(
          command.meetingId,
        );
        const Ameeting = new Meeting(
          new MeetingIDVO(dtoMeeting.id),
          new MeetingStateVO(dtoMeeting.state),
          undefined,
          undefined,
          undefined,
          undefined,
          new Candidate(
            dtoMeeting.candidate,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
          ),
        );
        Ameeting.Accept();
        dtoMeeting.state = Ameeting.state.current;
        this.repository.modifyMeeting(dtoMeeting);
        break;
      case RejectMeeting:
        //query meeting command.meetingId
        let meeting = new Meeting();
        meeting.state = MeetingStates.Rejected;
        this.repository.modifyMeeting(meeting);
        break;
      default:
        throw new Error(
          `MeetingService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
