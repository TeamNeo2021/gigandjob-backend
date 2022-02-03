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
        console.log('Entre');
        const cmd: AcceptMeeting = <AcceptMeeting>command;
        const Mdto: MeetingDTO = await this.repository.getById(cmd.meetingId);
        console.log('A punto de llamar entity fact');
        const AMeeting: Meeting = EntitiesFactory.fromMeetingDtotoMeeting(Mdto);
        console.log('entityfactory superado');
        AMeeting.Accept();
        console.log('Accept Superado');
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
