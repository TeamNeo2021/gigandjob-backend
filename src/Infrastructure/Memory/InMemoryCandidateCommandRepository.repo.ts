import { CandidateCommandRepository } from "src/Application/Repositories/CandidateCommandRepository.repo";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";

export class InMemoryCandidateCommandRepository implements CandidateCommandRepository{

    private candidates: Candidate[] = [];

    save(candidate: Candidate): Candidate {
        console.log(candidate);
        this.candidates.push(candidate);
        return candidate
    }
}