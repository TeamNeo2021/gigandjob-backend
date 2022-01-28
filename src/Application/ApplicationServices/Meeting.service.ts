import { Injectable } from '@nestjs/common';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';
import { IMeetingRepository } from '../Repositories/MeetingRepository.repo';

@Injectable()
export class MeetingService implements IApplicationService {
  private readonly Meetrepo: IMeetingRepository;
  constructor(Meetrepo: IMeetingRepository){
    this.Meetrepo = Meetrepo;
  }
  async Handle(command: Object): Promise<void> {
    switch (command.constructor) {
      case AcceptMeeting:
        //query meeting command.meetingId
        // let meeting = new Meeting();
        // meeting.state = MeetingStates.Pending;
        //query save meeting
        break;
        case CancelMeetingDTO: {
          let dto: CancelMeetingDTO = <CancelMeetingDTO> command
          let CanceledMeeting = await this.Meetrepo.cancelMeeting(dto.id)
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