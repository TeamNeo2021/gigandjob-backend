import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { EmployerDTO } from 'src/Application/DTO/Employer/Employer.dto';
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
        await this.collection.doc(employer.employerId).set({ ...employer, location: { ...employer.location }});
       
    }
    async eliminate(id: string): Promise<void> {
        await this.collection.doc(id).update({
            state: EmployerStates[EmployerStates.Eliminated]
        })
    }

    async get(id: string): Promise<EmployerDTO> {
        const employerQuery = await this.collection.where('employerId', '==', id).limit(1).get(),
              employerResult = employerQuery.docs[0].data()
        if (!employerResult) return null
        
        return new EmployerDTO(employerResult);
    }

    async getAll(): Promise<EmployerDTO[]> {
        const employerQuery = await this.collection.get()

        return employerQuery.docs.map( employer => new EmployerDTO(employer.data()));
    }
}
