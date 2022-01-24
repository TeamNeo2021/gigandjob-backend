import { Controller, Put, Post, Delete, Param } from '@nestjs/common';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';

@Controller('meeting')
export class MeetingController {
    constructor(private readonly MeetingService: IApplicationService){}
  //dominio/meeting/accept
  @Put('accept')
  acceptMeeting(request: AcceptMeeting): any {
    request = new AcceptMeeting();
    request.candidateId = @Param('candidateId');
    request.meetingId = @Param('meetingId');
    console.log(@Param('candidateId')+@Param('meetingId'))
    this.MeetingService.Handle(request);
    return 'ok';
  }
}
