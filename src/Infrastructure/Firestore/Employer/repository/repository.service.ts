import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { EmployerRepository } from 'src/Application/Repositories/Employer/repository.interface';
import { Employer } from 'src/Dominio/AggRoots/Employer/Employer';
import { EmployerStates } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';

type EmployerEntity = {
    id: string,
    location: string,
    name: string,
    description: string,
    state: string,
    rif: string,
    phone: string,
    mail: string,
    comDesignation: string,
    offers: string[]
}

@Injectable()
export class EmployerRepositoryService implements EmployerRepository {
    constructor(@Inject('employers') private collection: CollectionReference<EmployerEntity>) {}

    private entityToEmployer(employerResult: EmployerEntity) {
        return Employer.Unsafe(
            employerResult.id,
            employerResult.name,
            employerResult.description,
            EmployerStates[employerResult.state],
            employerResult.location,
            employerResult.rif,
            employerResult.phone,
            employerResult.mail,
            employerResult.comDesignation
        )
    }

    async get(id: string): Promise<Employer> {
        const employerQuery = await this.collection.where('id', '==', id).limit(1).get(),
              employerResult = employerQuery.docs[0].data()
        if (!employerResult) return null

        return this.entityToEmployer(employerResult)
    }
    async getAll(): Promise<Employer[]> {
        const employerQuery = await this.collection.get()

        return employerQuery.docs.map(r => this.entityToEmployer(r.data()))
    }
    async insert(id: string, name: string, description: string, location: string, state: string, rif: string, phone: string, mail: string, comDesignation: string) {
        await this.collection.doc(id).set({
            id,
            name,
            description,
            location,
            state,
            rif,
            phone,
            mail,
            comDesignation,
            offers: []
        })
    }
}
