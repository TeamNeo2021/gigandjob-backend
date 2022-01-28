import { Controller, Put, Post, Delete, Body } from '@nestjs/common';
import { MeeetingFirestoreRepository } from 'src/Infrastructure/Firestore/MeetingFirestoreRepository.repo';
import { MeetingApplicationService} from '../DTO/Meeting/AcceptMeeting';
import { RejectMeeting } from '../DTO/Meeting/rejectMeetingDTO';
import { MeetingService } from './MeetingApplicationService.service';

@Controller('meeting')MeetingApplicationService
export class MeetingController {
  private readonly meetingService: MeetingService;
  private readonly repository: MeeetingFirestoreRepository;
  constructor() {
    this.repository = new MeeetingFirestoreRepository();
    this.meetingService = new MeetingService(this.repository);
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
    /*console.log(Body);
    console.log(request);*/ //Esto es para probar
    this.meetingService.Handle(request);
    return 'ok';
  }
}
