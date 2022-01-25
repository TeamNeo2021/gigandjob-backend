import { CandidateRegisterService } from "../../ApplicationServices/CandidateRegister.service";
import { InMemoryCandidateCommandRepository } from "../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { Candidate } from "../../../Dominio/AggRoots/Candidate/Candidate";

const CandidateTestDTO = {
    name: 'Carlos',
    lastname: 'Valero',
    phoneCode: '0414',
    phoneNumber: '0000000',
    email: 'mail@gmail.com',
    birthDate: '1999-10-10',
    latitude: 5,
    longitude: 6
}

const memoryRepo = new InMemoryCandidateCommandRepository()

const registerService = new CandidateRegisterService(memoryRepo)

describe("register a new Candidate in memory", ()=>{

    
    it("should suceed when registering a valid Candidate",()=>{
        expect(registerService.RegisterCandidate(CandidateTestDTO)).toBeInstanceOf(Candidate);
    })

    
})