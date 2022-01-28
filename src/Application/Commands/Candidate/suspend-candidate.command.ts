import { CandidateTransactionService } from "src/Application/ApplicationServices/Candidate/transaction.interface";
import { CandidateCommand, CandidateCommandResult } from "./command.interface";

export class SuspendCandidateCommand implements CandidateCommand<void> {
    constructor(private id: string, private until: Date) {}

    async execute(service: CandidateTransactionService): Promise<CandidateCommandResult<void>> {
        const candidate = await service.get(this.id)
        const suspendedCount = await service.getSuspensionCount(this.id)
        if (suspendedCount + 1 >= await service.getSuspensionLimit()) {
            candidate.eliminateThisCandidate()
            return CandidateCommandResult.nothing(candidate)
        } else {
            candidate.suspendThisCandidate()
            await service.scheduleCandidateReactivation(candidate.Id.value, this.until)
            return CandidateCommandResult.nothing(candidate)
        }
        
    }
}