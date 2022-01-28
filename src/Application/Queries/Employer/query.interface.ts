import { EmployerTransactionService } from "src/Application/ApplicationServices/Employer/transaction.interface";

export interface EmployerQuery<T> {
    query(service: EmployerTransactionService): Promise<T>
}