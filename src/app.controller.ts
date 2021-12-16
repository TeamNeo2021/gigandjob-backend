import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Employer } from './Domain/AggRoots/Employer/Employer';
import { EmployerRegistered } from './Domain/DomainEvents/EmployerRegistered';
import { EmployerRegisteredHandler } from './Domain/DomainEvents/EmployerRegisteredHandler';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
