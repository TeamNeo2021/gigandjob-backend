import { ICandidateRepository } from "src/Application/Repositories/CandidateRepository.repo";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";

export class CandidateFirebaseAdapter implements ICandidateRepository{
    async save(candidate: Candidate): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async modify(id: string, candidate: Candidate): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async eliminate(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async suspend(id: string, candidate: Candidate): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async reactive(id: string, candidate: Candidate): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getOne(id: string): Promise<Candidate> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Candidate[]> {
        throw new Error("Method not implemented.");
    }
}