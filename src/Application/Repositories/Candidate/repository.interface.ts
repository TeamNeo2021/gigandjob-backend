import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";

export interface CandidateRepository {
    get(id: string): Promise<Candidate>
}