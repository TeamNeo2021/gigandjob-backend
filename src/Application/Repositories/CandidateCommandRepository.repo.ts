import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";

export interface ICandidateCommandRepository{

    save(candidate: Candidate): Candidate;

    modify(id: string, candidate: Candidate): Candidate;

    eliminate(id: string): void;

    suspend(id: string, candidate: Candidate): Candidate;

    reactive(id: string, candidate: Candidate): Candidate;

    
    // we must user CQRS, this will be delete
    getOne(id: string): Candidate;
    getAll(): Candidate[];

}