import { Employer } from "src/Dominio/AggRoots/Employer/Employer";

export interface EmployerRepository {

    get(id: string): Promise<EmployerDTO>
    getAll(): Promise<EmployerDTO[]>
    save(employer: EmployerDTO): Promise<void>;
    eliminate(id: string): Promise<void>;
    //insert(id: string): Promise<void>(employer: EmployerDTO): Promise<void>;
}