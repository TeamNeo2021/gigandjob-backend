import { ICandidateCommandRepository } from '../../Application/Repositories/CandidateCommandRepository.repo';
import { Candidate } from '../../Dominio/AggRoots/Candidate/Candidate';

export class InMemoryCandidateCommandRepository
  implements ICandidateCommandRepository
{
  private candidates: Candidate[] = [];

  save(candidate: Candidate): Candidate {
    this.candidates.push(candidate);
    return candidate;
  }

  modify(id: string, candidate: Candidate): Candidate {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
    this.candidates.push(candidate);
    return candidate;
  }

  eliminate(id: string): void {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
  }

  suspend(id: string, candidate: Candidate): Candidate {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
    this.candidates.push(candidate);
    return candidate;
  }

  reactive(id: string, candidate: Candidate): Candidate {
    this.candidates = this.candidates.filter((candidate) => candidate.id != id);
    this.candidates.push(candidate);
    return candidate;
  }

  // we must user CQRS, this will be delete
  getOne(id: string): Candidate {
    return this.candidates.find((candidate) => candidate.id == id);
  }
  getAll(): Candidate[] {
    return this.candidates;
  }
}
