import { Employer } from "src/Dominio/AggRoots/Employer/Employer";

export interface EmployerRepository {
    get(id: string): Promise<Employer>
    getAll(): Promise<Employer[]>
}