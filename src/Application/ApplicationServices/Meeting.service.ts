import { Injectable } from '@nestjs/common';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';
import { RejectMeeting } from '../DTO/Meeting/rejectMeetingDTO';
import { IMeetingRepository } from '../Repositories/MeetingRepository.repo';

@Injectable()
export class MeetingService implements IApplicationService {
  private repository: IMeetingRepository;
  constructor(repository: IMeetingRepository) {
    this.repository = repository;
  }
  Handle(command: Object): void {
    switch (command.constructor) {
      case AcceptMeeting:
        //agendar en calendario
        let dtoMeeting =  this.repository.getById(command.meetingId)
        let meeting = new Meeting(dtoMeeting.id,
          dtoMeeting.state,
          dtoMeeting.description,
          dtoMeeting.date,
          dtoMeeting.location,
          dtoMeeting.employer, //employerId
          dtoMeeting.candidate); //candidateId
        meeting.state = new MeetingStates.Active;
        this.repository.modifyMeeting(meeting);     
        break;
      case RejectMeeting:
        //eliminar en calendario
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
