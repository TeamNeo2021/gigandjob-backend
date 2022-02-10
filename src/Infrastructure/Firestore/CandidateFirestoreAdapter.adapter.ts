import { CollectionReference } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { ICandidateRepository } from "src/Application/Repositories/CandidateRepository";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";


type CandidateEntity = {
    id: string
    state: {
        value: number,
        suspensionCount: number
    }
    name: {
        names: string
        lastnames: string
    }
    phone: {
        areaCode: string
        phoneNumber: string
    }
    email: string 
    birthdate: string 
    location: {
        latitude: number,
        longitude: number
    }
}

function entityToClass(candidateResult: CandidateEntity) {
    return new Candidate(
       new CandidateIdVo(candidateResult.id),
       new CandidateStateVo(candidateResult.state.value, candidateResult.state.suspensionCount),
       new CandidateFullNameVo(candidateResult.name.names, candidateResult.name.lastnames),
       new CandidatePhoneVo(candidateResult.phone.areaCode, candidateResult.phone.phoneNumber),
       new CandidateEmailVo(candidateResult.email),
       new CandidateBirthDateVo(new Date(candidateResult.birthdate)),
       new CandidateLocationVo(candidateResult.location.latitude, candidateResult.location.longitude)
    )
}

@Injectable()
export class CandidateFirestoreAdapter implements ICandidateRepository {
    constructor(@Inject('candidates') private repo: CollectionReference<CandidateEntity>) {}

    async save(candidate: Candidate): Promise<void> {
        await this.repo.doc(candidate.id).set({
            id: candidate.id,
            state: {
                value: candidate.state.state,
                suspensionCount: candidate.state.suspensionCount
            },
            name: {
                names: candidate.name.names.valueOf(),
                lastnames: candidate.name.lastNames.valueOf()
            },
            phone: {
                areaCode: candidate.phone.areaCode.valueOf(),
                phoneNumber: candidate.phone.phoneNumber.valueOf()
            },
            email: candidate.email.email.valueOf(),
            birthdate: candidate.birthDay.birthDate.toString(),
            location: {
                latitude: candidate.location.latitude.valueOf(),
                longitude: candidate.location.longitude.valueOf()
            }
        })
    }
    modify(id: string, candidate: Candidate): Promise<void> {
        return this.save(candidate)
    }
    async eliminate(id: string): Promise<void> {
        await this.repo.doc(id).delete()
    }
    async suspend(id: string, candidate: Candidate): Promise<void> {
        await this.repo.doc(id).update({
            state: {
                value: CandidateStatesEnum.Suspended,
                suspensionCount: candidate.state.suspensionCount
            }
        })
    }
    async reactive(id: string, candidate: Candidate): Promise<void> {
        await this.repo.doc(id).update({
            state: {
                value: CandidateStatesEnum.Active,
                suspensionCount: candidate.state.suspensionCount
            }
        })
    }
    async getOne(id: string): Promise<Candidate> {
        console.log("toy en get one")
        const candidateQuery = await this.repo.doc(id).get(),
              candidateResult = candidateQuery.data()
        console.log(candidateResult)
        
        if (!candidateResult) return null

        return entityToClass(candidateResult)
    }

    async getAll(): Promise<Candidate[]> {
        const candidateQuery = await this.repo.get()
        
        return candidateQuery.docs.map(d => entityToClass(d.data()))
    }

}