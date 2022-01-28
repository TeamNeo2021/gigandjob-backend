import { CandidateCommand } from "src/Application/Commands/Candidate/command.interface";

export interface CandidateApplicationService {
    execute<T>(command: CandidateCommand<T>): Promise<T> 
}