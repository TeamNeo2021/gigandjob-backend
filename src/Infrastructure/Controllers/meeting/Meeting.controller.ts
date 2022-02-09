import { Controller, Put, Post, Delete, Body, Inject, HttpException, HttpCode, Get, Header, HttpStatus, Param } from '@nestjs/common';
import { AcceptMeeting } from 'src/Application/DTO/Meeting/AcceptMeeting';
import { IMeetingRepository } from 'src/Application/Repositories/MeetingRepository.repo';
import { FirestoreModule } from 'src/Infrastructure/Firestore/config/firestore.module';
import { MeetingFirestoreAdapter } from 'src/Infrastructure/Firestore/MeetingFirestoreAdapter.adapter';
import { MeetingQueryFirestoreAdapter } from 'src/Infrastructure/Firestore/MeetingMobileQueryFirestoreAdapter';
import { MeetingApplicationService} from '../../../Application/ApplicationServices/MeetingApplicationService.service';
import { RejectMeeting } from '../../../Application/DTO/Meeting/RejectMeetingDTO';


@Controller('meeting')
export class MeetingController {
  
  constructor(@Inject('MeetingApplicationService') 
  private meetingService: MeetingApplicationService,
  private meetingQueryRepo: MeetingQueryFirestoreAdapter) {
    
  }

  
  @Get(':id/getall')
  @HttpCode(200)
  @Header('Access-Control_Allow_Origin', '*')
  async getAll(@Param('id') cadidateId: string) {
    const query = await this.meetingQueryRepo.getAll(cadidateId);
    console.log(query)
    if (!query)
      throw new HttpException(
        'Could not find a register with that date',
        HttpStatus.NO_CONTENT,
      );
    return query;
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
