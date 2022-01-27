import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { IEmployerRepository } from "../Repositories/EmployerRepository.repo";

export class EmployerReactivateService{
    private repository: IEmployerRepository;

    constructor(repository: IEmployerRepository){
        this.repository = repository;
    }

    public ReactivateEmployer(dto: EmployerDTO): Employer{

        let employer = new Employer(

        );

        employer = employer.reactivateEmployer();

        this.repository.reactive(employer);

        return employer
    }

}