import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Employer } from './Dominio/AggRoots/Employer/Employer';
import { EmployerRegistered } from './Dominio/DomainEvents/EmployerRegistered';
import { EmployerRegisteredHandler } from './Dominio/DomainEvents/EmployerRegisteredHandler';
/*
import { Meeting } from './Dominio/AggRoots/Meeting/Meeting';
import { MeetingStateVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO';

*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    /*var _meeting = new Meeting('1', new MeetingStateVO(), new MeetingDescriptionVO("Toma papá"), new Date("2021-12-20"), 'holo');
    console.log(_meeting);
    */
    return this.appService.getHello();
  }
}
