import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingDateVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO';
import { MeetingDescriptionVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingLocationVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingLocationVO';
import { MeetingStates, MeetingStateVO } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { EntitiesFactory } from '../Core/EntitiesFactory.service';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';
import { CreateMeetingDTO } from '../DTO/Meeting/CreateMeetingDTO.dto';
import { MeetingDTO } from '../DTO/Meeting/Meeting.dto';
import { ModifyMeetingDTO } from '../DTO/Meeting/modifyMeetingDTO';
import { RejectMeeting } from '../DTO/Meeting/RejectMeetingDTO';
import { Publisher } from '../Publisher/publisher.interface';
import { ICandidateRepository } from '../Repositories/CandidateRepository';
import { EmployerRepository } from '../Repositories/Employer/repository.interface';
import { IMeetingRepository } from '../Repositories/MeetingRepository.repo';

export class MeetingApplicationService implements IApplicationService {
  private repository: IMeetingRepository;
  constructor(
    repository: IMeetingRepository, 
    private candidateRepository: ICandidateRepository, 
    private employerRepository: EmployerRepository,
    private publisher: Publisher
  ) {
    this.repository = repository;
  }
  async Handle(command: any): Promise<void> {
    switch (command.constructor) {
      case CreateMeetingDTO: {
        const cmd = command as CreateMeetingDTO,
              employer = await this.employerRepository.get(cmd.employer),
              candidate = await this.candidateRepository.getOne(cmd.candidate),
              meeting = Meeting.ScheduleOn(
                new MeetingDateVO(cmd.date),
                EntitiesFactory.fromEmployerDtoToEmployer(employer),
                candidate,
                new MeetingDescriptionVO(cmd.description),
                new MeetingLocationVO(cmd.location.latitude,cmd.location.longitude),
                new MeetingStateVO(MeetingStates[cmd.state]),
              )
        await this.repository.saveMeeting(EntitiesFactory.fromMeetingToMeetingDTO(meeting))
        this.publisher.publish(meeting.GetChanges() as any[])
        break
      }
      case AcceptMeeting: {
        //agendar en calendario
        console.log('Entre');
        const cmd: AcceptMeeting = <AcceptMeeting>command;
        const Mdto: MeetingDTO = await this.repository.getById(cmd.meetingId);
        console.log('A punto de llamar entity fact');
        const AMeeting: Meeting = EntitiesFactory.fromMeetingDtotoMeeting(Mdto);
        console.log('entityfactory superado');
        console.log(AMeeting)
        AMeeting.Accept();
        console.log('Accept Superado');
        console.log(AMeeting)
        const MMdto: ModifyMeetingDTO =
          EntitiesFactory.fromMeetingToModifyMeetingDTO(AMeeting);
        this.repository.modifyMeeting(MMdto);
        break;
      }
      case RejectMeeting: {
        //query meeting command.meetingId
        const cmd2: AcceptMeeting = <AcceptMeeting>command;
        const Mdto: MeetingDTO = await this.repository.getById(cmd2.meetingId);
        const RMeeting: Meeting = EntitiesFactory.fromMeetingDtotoMeeting(Mdto);
        RMeeting.Reject();
        const MMdto2: ModifyMeetingDTO =
          EntitiesFactory.fromMeetingToModifyMeetingDTO(RMeeting);
        this.repository.modifyMeeting(MMdto2);
        break;
      }
      default:
        console.log('default');
        throw new Error(
          `MeetingService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
