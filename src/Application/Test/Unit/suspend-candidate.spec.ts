import { CandidateApplicationService } from "src/Application/ApplicationServices/Candidate/candidate.service"
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

describe("Suspend candidate", () => {
    let candidateRepository: CandidateRepository 
    let candidateSuspensionRespository: CandidateSuspensionRespository 
    let candidateConfiguration: CandidateConfiguration
    let candidateScheduler: CandidateScheduler
    let candidatePublisher: CandidatePublisher
    const mockCandidateFactory = () => new Candidate(
        new CandidateIdVo(),
        new CandidateStateVo(CandidateStatesEnum.Active),
        new CandidateFullNameVo("Michael Kevin", "Nelo Guzman"),
        new CandidatePhoneVo("424", "1956647"),
        new CandidateEmailVo("mknelo.18@est.ucba.edu.ve"),
        new CandidateBirthDateVo(new Date(2000, 3, 23)),
        new CandidateLocationVo(75, 76)
    )

    beforeEach(() => {
        candidateRepository = {
            get: jest.fn().mockReturnValue(Promise.resolve(mockCandidateFactory()))
        }
        candidateSuspensionRespository = {
            getSuspensionCount: jest.fn().mockReturnValue(Promise.resolve(0))
        }
        candidateConfiguration = {
            getSuspensionLimit: jest.fn().mockReturnValue(Promise.resolve(2))
        }
        candidatePublisher = {
            publish: jest.fn()
        }
    })

    it("should publish the suspension events and schedule candidate reactivation", async () => {
        const mockCandidate = mockCandidateFactory()
        let mockFn = jest.fn().mockReturnValue(Promise.resolve(mockCandidate))
        let pubMockFn = jest.fn()
        let schedulerMockFn = jest.fn()
        let mockDate = new Date(Date.now() + 3000)
        candidateScheduler = {
            scheduleCandidateReactivation: schedulerMockFn
        }
        candidatePublisher = {
            publish: pubMockFn
        }
        candidateRepository = {
            get: mockFn
        }
        const applicationService = new CandidateApplicationService(
            candidateRepository,
            candidateSuspensionRespository,
            candidateConfiguration,
            candidateScheduler,
            candidatePublisher
        )
        const suspensionCommand = new SuspendCandidateCommand(mockCandidate.id, mockDate)
        await applicationService.execute(suspensionCommand)

        expect(candidatePublisher.publish).toHaveBeenCalled()
        expect(candidateScheduler.scheduleCandidateReactivation).toHaveBeenCalled()
        expect(pubMockFn.mock.calls[0][0][0]).toHaveProperty('body.new_current', 'Suspended')
        expect(pubMockFn.mock.calls[0][0][0]).toHaveProperty('ident', 'CandidateStateModified')
    })

    it("should destroy the user when the limit has been reached", async () => {
        const mockCandidate = mockCandidateFactory()
        let mockFn = jest.fn().mockReturnValue(Promise.resolve(mockCandidate))
        let pubMockFn = jest.fn()
        let scheduleMockFn = jest.fn()
        let mockDate = new Date(Date.now() + 3000)
        candidateSuspensionRespository = {
            getSuspensionCount: jest.fn().mockReturnValue(Promise.resolve(1))
        }
        candidateConfiguration = {
            getSuspensionLimit: jest.fn().mockReturnValue(Promise.resolve(2))
        }
        candidatePublisher = {
            publish: pubMockFn
        }
        candidateRepository = {
            get: mockFn
        }
        candidateScheduler = {
           scheduleCandidateReactivation: scheduleMockFn 
        }
        const applicationService = new CandidateApplicationService(
            candidateRepository,
            candidateSuspensionRespository,
            candidateConfiguration,
            candidateScheduler,
            candidatePublisher
        )
        const suspensionCommand = new SuspendCandidateCommand(mockCandidate.id, mockDate)
        await applicationService.execute(suspensionCommand)

        expect(candidateScheduler.scheduleCandidateReactivation).not.toHaveBeenCalled()
        expect(candidatePublisher.publish).toHaveBeenCalled()
        expect(pubMockFn.mock.calls[0][0][0]).toHaveProperty('body.new_current', 'Eliminated')
        expect(pubMockFn.mock.calls[0][0][0]).toHaveProperty('ident', 'CandidateStateModified')
    })
})