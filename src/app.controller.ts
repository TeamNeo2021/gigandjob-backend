import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Meeting } from './Dominio/AggRoots/Meeting/Meeting';
import { MeetingStateVO, MeetingStates } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO';
import { MeetingIDVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO';
import { CandidateIdVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { EmployerIdVO } from './Dominio/AggRoots/Employer/ValueObjects/EmployerIdVO';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {

    var _meeting = new Meeting( new MeetingIDVO() , new MeetingStateVO(MeetingStates.Active), 
    new MeetingDescriptionVO("Toma papá"), new MeetingDateVO (new Date(Date.now()+1000)), 
    new MeetingLocationVO("Elm Street"), new EmployerIdVO("69"),new CandidateIdVo("69"));
    console.log(_meeting);

    return this.appService.getHello();
    
  }
}
