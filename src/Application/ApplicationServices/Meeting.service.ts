import { Injectable } from '@nestjs/common';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';
import { RejectMeeting } from '../DTO/Meeting/rejectMeetingDTO';

@Injectable()
export class MeetingService implements IApplicationService {
  Handle(command: Object): void {
    switch (command.constructor) {
      case AcceptMeeting:
        //agendar en calendario
        //query meeting command.meetingId
        let meeting = new Meeting();
        meeting.state = MeetingStates.Active;
        //query save meeting       
        break;
      case RejectMeeting:
        //eliminar en calendario
        //query meeting command.meetingId
        let meeting = new Meeting();
        meeting.state = MeetingStates.Canceled;
        //query save meeting
        break;
      default:
        throw new Error(
          `OfferService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
