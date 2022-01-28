import { Controller, Put, Post, Delete, Body } from '@nestjs/common';
import { AcceptMeeting } from '../../../Application/DTO/Meeting/AcceptMeeting';
import { MeetingService } from '../../../Application/ApplicationServices/Meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}
  
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

  
}
