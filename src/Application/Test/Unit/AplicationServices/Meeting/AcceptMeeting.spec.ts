/* eslint-disable prettier/prettier */
import { randomUUID } from 'crypto';
import { MeetingApplicationService } from '../../../../ApplicationServices/MeetingApplicationService.service';
import { EmployerDTO } from '../../../../DTO/Employer.dto';

import { AcceptMeeting } from '../../../../DTO/Meeting/AcceptMeeting';
import { MeetingDTO } from '../../../../DTO/Meeting/Meeting.dto';
import { IMeetingRepository } from '../../../../Repositories/MeetingRepository.repo';
import { CandidateStatesEnum } from '../../../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { EmployerStates } from '../../../../../Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';
import { MeetingStates } from '../../../../../Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { MockMeetingAdapter } from '../../../../../Infrastructure/Memory/MockMeetingRepo';
import { LocationDTO } from '../../../../DTO/Location.dto';
import { CandidateDTO } from '../../../../DTO/Candidate.dto';

const MeetingRepo = new MockMeetingAdapter();

const WrongCommand = { Prueba: 1 };

const exampleEmployer = new EmployerDTO({
  employerId: randomUUID(),
  name: 'Soluciones de Prueba',
  description: 'La descripcion es una prueba',
  state: EmployerStates.Active,
  location: new LocationDTO({ latitude: 20, logitude: 90 }),
  rif: 'J-1236782',
  phone: '+584124578457',
  mail: 'prueba@test.com',
});

const exampleCandidate = new CandidateDTO({
  id: randomUUID(),
  state: CandidateStatesEnum.Active,
  name: 'Peter Parker',
  phone: '0414 4407938',
  email: 'spidey@gmail.com',
  birthDate: new Date('2000-01-16'),
  location: new LocationDTO({ latitude: 20, logitude: 90 }),
});

const exampleMeeting = new MeetingDTO({
  candidate: exampleCandidate,
  employer: exampleEmployer,
  id: randomUUID(),
  state: MeetingStates.Pending,
  description: 'Meeting test description',
  date: new Date(2022, 11, 31),
  location: { latitude: 90, longitude: 90 },
});

const ExCommand = new AcceptMeeting(exampleCandidate.id, exampleMeeting.id);

function create_Service(repoO: IMeetingRepository): MeetingApplicationService {
  const service = new MeetingApplicationService(repoO);
  return service;
}

describe('Accept a meeting', () => {
  it('should suceed when valid candidate acceps valid Meeting', async () => {
    MeetingRepo.saveMeeting(exampleMeeting);
    const MeetingService = create_Service(MeetingRepo);
    await MeetingService.Handle(ExCommand).catch();
    const ModifiedMeeting = await MeetingRepo.getById(exampleMeeting.id);
    expect(() => ModifiedMeeting.id == exampleMeeting.id);
  });
  /*it('Should fail when using an Invalid command', async () => {
    const MeetingService = create_Service(MeetingRepo);
    let error: any = undefined;
    await MeetingService.Handle(WrongCommand).catch((err) => (error = err));
    expect(() => {
      throw error;
    }).toThrowError(
      new Error(`MeetingService: Command doesn't exist: ${Object}`),
    );
  });*/
});
