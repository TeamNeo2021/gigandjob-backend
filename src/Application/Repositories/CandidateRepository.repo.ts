import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";

export interface CandidateRepository{
    save(candidate: Candidate): void;
    findOneById(id: string): Candidate;
}