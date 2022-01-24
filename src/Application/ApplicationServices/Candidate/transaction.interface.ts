import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";

export interface CandidateTransactionService {
    get(id: string): Promise<Candidate>
    getSuspensionCount(id: string): Promise<number>
    getSuspensionLimit(): Promise<number>
    scheduleCandidateReactivation(id: string, at: Date): Promise<void>
}