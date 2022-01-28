import { ICandidateRepository } from '../../Application/Repositories/CandidateRepository';
import { Candidate } from '../../Dominio/AggRoots/Candidate/Candidate';

export class InMemoryCandidateRepository implements ICandidateRepository{
  private candidates: Candidate[] = [];

  async save(candidate: Candidate): Promise<void> {
    this.candidates.push(candidate.registerCandidate());
  }

  async modify(id: string, candidate: Candidate): Promise<void>  {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
    this.candidates.push(candidate);
  }

  async eliminate(id: string): Promise<void>  {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
  }

  async suspend(id: string, candidate: Candidate): Promise<void>  {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
    this.candidates.push(candidate);
  }

  async reactive(id: string, candidate: Candidate): Promise<void>  {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
    this.candidates.push(candidate);
  }

  /**
   * **This will be delete !!!** 
  */
  async getOne(id: string): Promise<Candidate> {
    return this.candidates.find((candidate) => candidate.id == id);
  }

  /**
   * **This will be delete !!!** 
  */
  async getAll(): Promise<Candidate[]> {
    return this.candidates;
  }
}
