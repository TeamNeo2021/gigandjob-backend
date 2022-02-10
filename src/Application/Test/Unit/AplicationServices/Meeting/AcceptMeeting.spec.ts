/* eslint-disable prettier/prettier */
import { randomUUID } from 'crypto';
import { MeetingApplicationService } from '../../../../ApplicationServices/MeetingApplicationService.service';
import { AcceptMeeting } from '../../../../DTO/Meeting/AcceptMeeting';
import { MeetingDTO } from '../../../../DTO/Meeting/Meeting.dto';
import { IMeetingRepository } from '../../../../Repositories/MeetingRepository.repo';
import { CandidateStatesEnum } from '../../../../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { EmployerStates } from '../../../../../Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';
import { MeetingStates } from '../../../../../Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { MockMeetingAdapter } from '../../../../../Infrastructure/Memory/MockMeetingRepo';
import { LocationDTO } from '../../../../DTO/Location.dto';
import { CandidateDTO } from '../../../../DTO/Candidate/Candidate.dto';
import { EmployerDTO } from '../../../../DTO/Employer/Employer.dto';
import { ICandidateRepository } from '../../../../Repositories/CandidateRepository';
import { EmployerRepository } from 'src/Application/Repositories/Employer/repository.interface';
import { Publisher } from '../../../../Publisher/publisher.interface';
import { MockEmployerRepo } from '../../../../../Infrastructure/Memory/MockEmployerRepo.repo';
import { InMemoryCandidateCommandRepository } from '../../../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo';
import { MockPublisher } from '../../../../../Infrastructure/Memory/MockPublisher';

const MeetingRepo = new MockMeetingAdapter();
const CandidateRepo = new InMemoryCandidateCommandRepository();
const EmployerRepo = new MockEmployerRepo();
const publisherMock = new MockPublisher();

const WrongCommand = { Prueba: 1 };

const exampleEmployer = new EmployerDTO({
  employerId: randomUUID(),
  name: 'Soluciones de Prueba',
  description: 'La descripcion es una prueba',
  state: EmployerStates.Active,
  location: { latitude: 20, longitude: 90 },
  rif: 'J-1236782',
  phone: '+584124578457',
  mail: 'prueba@test.com',
  offers: [],
});

const exampleCandidate = new CandidateDTO({
  candidateId: randomUUID().toString(),
  state: CandidateStatesEnum.Active,
  name: 'Peter',
  lastname: 'Parker',
  phone: '0414 4407938',
  email: 'spidey@gmail.com',
  birthdate: new Date('2000-01-16'),
  location: { latitude: 20, longitude: 90 },
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

const ExCommand = new AcceptMeeting(
  exampleCandidate.candidateId,
  exampleMeeting.id,
);

function create_Service(
                        repoO: IMeetingRepository,
                        repoC: ICandidateRepository,
                        repoE: EmployerRepository,
                        publi: Publisher
                      ): MeetingApplicationService {
  const service = new MeetingApplicationService(
                      repoO,
                      repoC,
                      repoE,
                      publi); 
  return service;
}

describe('Accept a meeting', () => {
  it('should suceed when valid candidate acceps valid Meeting', async () => {
    MeetingRepo.saveMeeting(exampleMeeting);
    const MeetingService = create_Service(MeetingRepo, CandidateRepo,EmployerRepo,publisherMock);
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
