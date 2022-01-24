import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";

export interface CandidateCommandRepository{
    save(candidate: Candidate): void;
}