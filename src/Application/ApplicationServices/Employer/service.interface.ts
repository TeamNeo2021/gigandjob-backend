import { EmployerCommand } from "src/Application/Commands/Employer/command.interface";
import { EmployerQuery } from "src/Application/Queries/Employer/query.interface";

export interface EmployerApplicationService {
    execute<T>(command: EmployerCommand<T>): Promise<T> 
    query<T>(query: EmployerQuery<T>): Promise<T>
}