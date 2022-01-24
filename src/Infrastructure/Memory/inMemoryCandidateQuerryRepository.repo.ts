import { ICandidateQuerryRepository } from "../../Application/Repositories/CandidateQuerryRepository.repo";
import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";

export class InMemoryCandidateQuerryRepository implements ICandidateQuerryRepository{

    private candidates: Candidate[] = [];

    getOne(id: string): Candidate {
        throw new Error("Method not implemented.");
    }

    getAll(): Candidate[] {
        throw new Error("Method not implemented.");
    }

}