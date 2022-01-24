import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";

export interface ICandidateQuerryRepository{

    getOne(id: string): Candidate;

    getAll(): Candidate[];

}