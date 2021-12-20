import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Employer } from './Dominio/AggRoots/Employer/Employer';
import { EmployerRegistered } from './Dominio/DomainEvents/EmployerRegistered';
import { EmployerRegisteredHandler } from './Dominio/DomainEvents/EmployerRegisteredHandler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {

    return this.appService.getHello();
  }
}
