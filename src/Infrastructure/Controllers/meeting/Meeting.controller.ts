import { Controller, Put, Post, Delete, Body } from '@nestjs/common';
import { AcceptMeeting } from 'src/Application/DTO/Meeting/AcceptMeeting';
import { IMeetingRepository } from 'src/Application/Repositories/MeetingRepository.repo';
import { MeeetingFirestoreAdapter} from 'src/Infrastructure/Firestore/MeetingFirestoreAdapter.adapter';
import { MeetingApplicationService} from '../../../Application/ApplicationServices/MeetingApplicationService.service';
import { RejectMeeting } from '../../../Application/DTO/Meeting/RejectMeetingDTO';


@Controller('meeting')MeetingApplicationService
export class MeetingController {
  private readonly meetingService: MeetingApplicationService;
  private readonly repository: IMeetingRepository;
  constructor() {
    this.repository = new MeeetingFirestoreAdapter();
    this.meetingService = new MeetingApplicationService(this.repository);
  }

  //dominio/meeting/accept
  @Put('accept')
  acceptMeeting(
    request: AcceptMeeting,
    @Body('candidateId') CI: string,
    @Body('meetingId') MI: string,
  ): any {
    request = new AcceptMeeting(CI, MI);
    this.meetingService.Handle(request);
    return 'ok';
  }

  @Put('reject')
  rejectMeeting(
    request: RejectMeeting,
    @Body('candidateId') CI: string,
    @Body('meetingId') MI: string,
  ): any {
    request = new RejectMeeting(CI, MI);
    this.meetingService.Handle(request);
    return 'ok';
  }
}
