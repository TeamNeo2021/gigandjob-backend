import { Candidate } from '../../Dominio/AggRoots/Candidate/Candidate';

export interface ICandidateRepository {
  save(candidate: Candidate): Promise<void>;

  modify(id: string, candidate: Candidate): Promise<void>;

  eliminate(id: string): Promise<void>;

  suspend(id: string, candidate: Candidate): Promise<void>;

  reactive(id: string, candidate: Candidate): Promise<void>;

  getOne(id: string): Promise<Candidate>;

  getAll(): Promise<Candidate[]>;
}
