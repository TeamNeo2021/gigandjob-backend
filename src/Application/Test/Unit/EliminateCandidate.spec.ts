import { CandidateApplicationService } from "src/Application/ApplicationServices/CandidateApplicationService.service"
import { EliminateCandidateDTO } from "src/Application/DTO/Candidate/EliminateCandidate.dto"
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate"
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo"
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo"
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO"
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo"
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo"
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo"

const mockCandidateFactory = () => new Candidate(
    new CandidateIdVo(),
    new CandidateStateVo(CandidateStatesEnum.Active),
    new CandidateFullNameVo("Francisco Javier", "Luna Rincon"),
    new CandidatePhoneVo("424", "9445764"),
    new CandidateEmailVo("mail@mail.com"),
    new CandidateBirthDateVo(new Date(1994, 3, 23)),
    new CandidateLocationVo(7, 76)
)

const memoryRepo = new InMemoryCandidateCommandRepository()

const eliminateService = new CandidateApplicationService(memoryRepo, {
    getSuspensionLimit: jest.fn(),
}, {
    scheduleCandidateReactivation: jest.fn()
})

describe("eliminate a candidate in memory", ()=>{

    
    it("should suceed when eliminating a valid Candidate",()=>{
        const mockCandidate = mockCandidateFactory()
        expect(eliminateService.Handle(new EliminateCandidateDTO(mockCandidate.Id.value)));
    })
    
})