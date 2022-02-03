import { EmployerRepository } from "src/Application/Repositories/Employer/repository.interface";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";

export class MockEmployerRepo implements EmployerRepository {
    private Employers: Employer[] = [];
    save(employer: Employer): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    get(id: string): Promise<Employer> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Employer[]> {
        throw new Error("Method not implemented.");
    }
    eliminate(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
     
    
  }