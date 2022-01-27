import { CandidateApplicationService } from "src/Application/ApplicationServices/Candidate/candidate.service"
import { ReactivateCandidateCommand } from "src/Application/Commands/Candidate/reactivate-candidate.command"
import { SuspendCandidateCommand } from "src/Application/Commands/Candidate/suspend-candidate.command"
import { CandidateConfiguration } from "src/Application/Configuration/Candidate/configuration.interface"
import { CandidatePublisher } from "src/Application/Publisher/Candidate/publisher.interface"
import { CandidateRepository } from "src/Application/Repositories/Candidate/repository.interface"
import { CandidateSuspensionRespository } from "src/Application/Repositories/Candidate/Suspensions/repository.interface"
import { CandidateScheduler } from "src/Application/Scheduler/Candidate/scheduler.interface"
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate"
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo"
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo"
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO"
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo"
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo"

describe("Reactivate Candidate", () => {
    let candidateRepository: CandidateRepository 
    let candidateSuspensionRespository: CandidateSuspensionRespository 
    let candidateConfiguration: CandidateConfiguration
    let candidateScheduler: CandidateScheduler
    let candidatePublisher: CandidatePublisher
    let candidateApplicationService: CandidateApplicationService
    let mockCandidate: Candidate
    const mockCandidateFactory = () => new Candidate(
        new CandidateIdVo(),
        new CandidateStateVo(CandidateStatesEnum.Active),
        new CandidateFullNameVo("Michael Kevin", "Nelo Guzman"),
        new CandidatePhoneVo("424", "1956647"),
        new CandidateEmailVo("michael@shocklogic.com"),
        new CandidateBirthDateVo(new Date(2000, 3, 23)),
        new CandidateLocationVo(75, 76)
    )

    beforeEach(() => {
        mockCandidate = mockCandidateFactory()
        candidateRepository = {
            get: jest.fn().mockReturnValue(mockCandidate)
        }
        candidateSuspensionRespository = {
            getSuspensionCount: jest.fn().mockReturnValue(Promise.resolve(0))
        }
        candidateConfiguration = {
            getSuspensionLimit: jest.fn().mockReturnValue(Promise.resolve(2))
        }
        candidateScheduler = {
            scheduleCandidateReactivation: jest.fn()
        }
        candidatePublisher = {
            publish: jest.fn()
        }
        candidateApplicationService = new CandidateApplicationService(
            candidateRepository,
            candidateSuspensionRespository,
            candidateConfiguration,
            candidateScheduler,
            candidatePublisher
        )
    })
    it("should reactivate a suspended candidate", async () => {
        const schedulerMockfn = jest.fn().mockImplementation(async (id, _) => {
            await candidateApplicationService.execute(new ReactivateCandidateCommand(id))
        })
        const publishMockFn = jest.fn()
        candidatePublisher.publish = publishMockFn
        candidateScheduler.scheduleCandidateReactivation = schedulerMockfn
        const mockCandidate = mockCandidateFactory()
        const suspensionCommand = new SuspendCandidateCommand(mockCandidate.id, new Date(Date.now() + 3000))
        await candidateApplicationService.execute(suspensionCommand)

        expect(candidateRepository.get).toHaveBeenCalledTimes(2)
        expect(candidateScheduler.scheduleCandidateReactivation).toHaveBeenCalled()
        expect(publishMockFn.mock.calls[0][0][0]).toHaveProperty('body.new_current', 'Suspended')
        expect(publishMockFn.mock.calls[1][0][1]).toHaveProperty('body.new_current', 'Active')
    })
})