import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { async } from 'rxjs';
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

    async save(employer: Employer): Promise<void> {
        await this.insert(employer.employerId._guid_value,
            employer.name.value_name_employer,
            employer.description.value_employer_description.valueOf(),
            employer.location.value_employer_location.valueOf(),
            EmployerStates[employer.state.value_state],
            employer.rif.value_employer_rif.valueOf(),
            employer.phone.value_employer_phone.valueOf(),
            employer.mail.value_employer_mail,
            employer.comDesignation.value_comercial_designation,
            employer.offers.map(o => o._Id._value))
    }
    async eliminate(id: string): Promise<void> {
        await this.collection.doc(id).update({
            state: EmployerStates[EmployerStates.Eliminated]
        })
    }

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
    async insert(id: string, name: string, description: string, location: string, state: string,
        rif: string, phone: string, mail: string, comDesignation: string, offers: string[] = []) {
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
            offers
        })
    }
}
