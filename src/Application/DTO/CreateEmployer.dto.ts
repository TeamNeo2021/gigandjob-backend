import { EmployerStates } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";

export class CreateEmployerCommandDTO {
    constructor(
        public name: string,
        public description: string,
        public location: string,
        public state: EmployerStates, 
        public rif: string,
        public phone: string,
        public mail: string,
        public comDesignation: string
    ) {

    }
}