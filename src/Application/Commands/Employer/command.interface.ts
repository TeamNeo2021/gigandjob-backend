import { EmployerTransactionService } from "src/Application/ApplicationServices/Employer/transaction.interface";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";

export class EmployerCommandResult<T> {
    events: readonly object[]

    private constructor(employer: Employer, public result: T) {
        this.events = employer.GetChanges()
    }

    public static nothing(employer: Employer) {
        return new EmployerCommandResult(employer, void 0)
    }

    public static fromResult<T>(employer: Employer, result: T) {
        return new EmployerCommandResult(employer, result)
    }
}

export interface EmployerCommand<T> {
    execute(service: EmployerTransactionService): Promise<EmployerCommandResult<T>>
}