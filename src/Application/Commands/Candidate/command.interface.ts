import { CandidateTransactionService } from "src/Application/ApplicationServices/Candidate/transaction.interface";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";

export class CandidateCommandResult<T> {
    private constructor(public result: T, public entity: Candidate) {}

    public static nothing(entity: Candidate) {
        return new CandidateCommandResult(void 0, entity)
    }

    public static result<T>(result: T, entity: Candidate) {
        return new CandidateCommandResult(result, entity)
    }
}

export interface CandidateCommand<T> {
    execute(service: CandidateTransactionService): Promise<CandidateCommandResult<T>>
}