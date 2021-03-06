import { CandidateApplicationService } from "../../ApplicationServices/CandidateApplicationService.service";
import { InMemoryCandidateCommandRepository } from "../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { Candidate } from "../../../Dominio/AggRoots/Candidate/Candidate";
import { CandidateRegisterDTO } from "../../../Application/DTO/Candidate/RegisterCandidate.dto";
import { type } from "os";

let CandidateTestDTO = new CandidateRegisterDTO(
    'Carlos',
    'Valero',
    '0414',
    '0000000',
    'mail@gmail.com',
    '1999-10-10',
    5,
    6,
    "ajsksjasaskas"
)

const memoryRepo = new InMemoryCandidateCommandRepository()

const registerService = new CandidateApplicationService(memoryRepo, {
    getSuspensionLimit: jest.fn()
}, {
    scheduleCandidateReactivation: jest.fn()
}, {
    publish: jest.fn()
})

describe("register a new Candidate in memory", ()=>{
    
    it("should suceed when registering a valid Candidate", async()=>{
        await registerService.Handle(CandidateTestDTO);
        let candidate = await memoryRepo.getAll()
        expect(candidate[0]).toBeTruthy();
    })

    
})