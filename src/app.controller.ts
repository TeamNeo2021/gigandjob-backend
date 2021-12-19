import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Candidate } from './Dominio/AggRoots/Candidate/Candidate';
import { CandidateBirthDateVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo';
import { CandidateEmailVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo';
import { CandidateFullNameVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo';
import { CandidateIdVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { CandidateLocationVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO';
import { CandidatePhoneVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo';
import { CandidateStatesEnum, CandidateStateVo } from './Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { CandidateEliminated } from './Dominio/DomainEvents/Candidate/CandidateEliminated';
import { CandidateEliminatedHandler } from './Dominio/DomainEvents/Candidate/CandidateEliminatedHandler';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
  
    return this.appService.getHello();
  }
}
