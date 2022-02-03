import { Employer } from "src/Dominio/AggRoots/Employer/Employer";

export interface EmployerTransactionService {
    get(id: string): Promise<EmployerDTO>
    getAll(): Promise<EmployerDTO[]>
}