import {
  Controller,
  Put,
  Post,
  Delete,
  Body,
  Inject,
  HttpException,
  HttpCode,
  Get,
  Header,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AcceptMeeting } from 'src/Application/DTO/Meeting/AcceptMeeting';
import { CreateMeetingDTO } from 'src/Application/DTO/Meeting/CreateMeetingDTO.dto';
import { MeetingDTO } from 'src/Application/DTO/Meeting/Meeting.dto';
import { IMeetingRepository } from 'src/Application/Repositories/MeetingRepository.repo';
import { FirestoreModule } from 'src/Infrastructure/Firestore/config/firestore.module';
import { MeetingFirestoreAdapter } from 'src/Infrastructure/Firestore/MeetingFirestoreAdapter.adapter';
import { MeetingQueryFirestoreAdapter } from 'src/Infrastructure/Firestore/MeetingMobileQueryFirestoreAdapter';
import { MeetingApplicationService } from '../../../Application/ApplicationServices/MeetingApplicationService.service';
import { RejectMeeting } from '../../../Application/DTO/Meeting/RejectMeetingDTO';

type MeetingData = {
  [P in keyof MeetingDTO as P extends 'id' ? never : P]: P extends 'location'
    ? { latitude: number; longitude: number }
    : MeetingDTO[P] extends Date
    ? Date
    : MeetingDTO[P] extends object
    ? string
    : MeetingDTO[P];
};

@Controller('meeting')
export class MeetingController {
  constructor(
    @Inject('MeetingApplicationService')
    private meetingService: MeetingApplicationService,
    private meetingQueryRepo: MeetingQueryFirestoreAdapter,
  ) {}

  @Get(':id/getall')
  @HttpCode(200)
  @Header('Access-Control_Allow_Origin', '*')
  async getAll(@Param('id') cadidateId: string) {
    const query = await this.meetingQueryRepo.getAll(cadidateId);
    console.log(query);
    if (!query)
      throw new HttpException(
        'Could not find a register with that date',
        HttpStatus.NO_CONTENT,
      );
    return query;
  }

  @Post()
  async create(@Body() creationData: MeetingData) {
    await this.meetingService.Handle(
      new CreateMeetingDTO({
        ...creationData,
        date: new Date(creationData.date),
      }),
    );
    return 'ok';
  }

  //dominio/meeting/accept
  @Put('accept')
  async acceptMeeting(
    request: AcceptMeeting,
    @Body('candidateId') CI: string,
    @Body('meetingId') MI: string,
  ): Promise<any> {
    request = new AcceptMeeting(CI, MI);
    await this.meetingService.Handle(request).catch((err) => {
      console.error(err)
      throw err;
    });
    return 'ok';
  }

  @Put('reject')
  async rejectMeeting(
    request: RejectMeeting,
    @Body('candidateId') CI: string,
    @Body('meetingId') MI: string,
  ): Promise<any> {
    request = new RejectMeeting(CI, MI);
    await this.meetingService.Handle(request).catch((err) => {
      throw err;
    });
    return 'ok';
  }
}
