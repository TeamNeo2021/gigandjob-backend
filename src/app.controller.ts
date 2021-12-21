import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Meeting } from './Dominio/AggRoots/Meeting/Meeting';
import { MeetingStateVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO';
import { MeetingIDVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {

    var _meeting = new Meeting( new MeetingIDVO() , new MeetingStateVO(), new MeetingDescriptionVO("Toma papá"), new Date("2021-12-24"), new MeetingLocationVO(""));
    console.log(_meeting);

    return this.appService.getHello();
    
  }
}
