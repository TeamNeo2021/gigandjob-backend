import { Employer } from "src/Dominio/AggRoots/Employer/Employer";


export interface IEmployerRepository{

    eliminate(id: string): void;

    reactive(id: string, candidate: Employer): Employer;
}