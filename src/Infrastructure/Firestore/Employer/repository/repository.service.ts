import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { EmployerRepository } from 'src/Application/Repositories/Employer/repository.interface';
import { Employer } from 'src/Dominio/AggRoots/Employer/Employer';
import { EmployerStates } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';

// type EmployerEntity = {
//     id: string,
//     location: string,
//     name: string,
//     description: string,
//     state: string,
//     rif: string,
//     phone: string,
//     mail: string,
//     comDesignation: string,
//     offers: string[]
// }

@Injectable()
export class EmployerRepositoryService implements EmployerRepository {
    constructor(@Inject('employers') private collection: CollectionReference<EmployerDTO>) {}

    async save(employer: EmployerDTO): Promise<void> {
        await this.collection.doc(employer.employerId).set(employer);
       
    }
    async eliminate(id: string): Promise<void> {
        await this.collection.doc(id).delete()
    }

    async get(id: string): Promise<EmployerDTO> {
        const employerQuery = await this.collection.where('id', '==', id).limit(1).get(),
              employerResult = employerQuery.docs[0].data()
        if (!employerResult) return null

        return new EmployerDTO(employerQuery);
    }

    async getAll(): Promise<EmployerDTO[]> {
        const employerQuery = await this.collection.get()

        return employerQuery.docs.map( employer => new EmployerDTO(employer.data()));
    }
}
