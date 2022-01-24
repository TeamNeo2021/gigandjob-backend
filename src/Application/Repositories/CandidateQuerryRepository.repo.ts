import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";

export interface CandidateQuerryRepository{
    findOneById(id: string): Candidate;
}