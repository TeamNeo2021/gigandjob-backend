import { Injectable } from '@nestjs/common';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';

import { EntitiesFactory } from '../Core/EntitiesFactory.service';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';
import { MeetingDTO } from '../DTO/Meeting/Meeting.dto';
import { ModifyMeetingDTO } from '../DTO/Meeting/modifyMeetingDTO';
import { RejectMeeting } from '../DTO/Meeting/RejectMeetingDTO';

import { IMeetingRepository } from '../Repositories/MeetingRepository.repo';

export class MeetingApplicationService implements IApplicationService {
  private repository: IMeetingRepository;
  constructor(repository: IMeetingRepository) {
    this.repository = repository;
  }
  async Handle(command: any): Promise<void> {
    switch (command.constructor) {
      case AcceptMeeting: {
        //agendar en calendario
        const cmd: AcceptMeeting = <AcceptMeeting>command;
        const Mdto: MeetingDTO = await this.repository.getById(cmd.meetingId);
        const AMeeting: Meeting = EntitiesFactory.fromMeetingDtotoMeeting(Mdto);
        console.log('Leegué hasta antes de accept');
        AMeeting.Accept();
        console.log('Leegué hasta antes despues de accept');
        const MMdto: ModifyMeetingDTO =
          EntitiesFactory.fromMeetingToModifyMeetingDTO(AMeeting);
        console.log('Pasé el entitiesFactory, tengo:' + MMdto);
        this.repository.modifyMeeting(MMdto);
        console.log('Pasé el modify Meeting');
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
        throw new Error(
          `MeetingService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
