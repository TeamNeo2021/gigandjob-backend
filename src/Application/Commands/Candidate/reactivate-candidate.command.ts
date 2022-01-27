import { CandidateTransactionService } from "src/Application/ApplicationServices/Candidate/transaction.interface";
import { CandidateCommand, CandidateCommandResult } from "./command.interface";

export class ReactivateCandidateCommand implements CandidateCommand<void> {
    constructor(private id: string) {}

    async execute(service: CandidateTransactionService): Promise<CandidateCommandResult<void>> {
        const candidate = await service.get(this.id) 
        candidate.reactivateThisCandidate()
        return CandidateCommandResult.nothing(candidate)
    }

}