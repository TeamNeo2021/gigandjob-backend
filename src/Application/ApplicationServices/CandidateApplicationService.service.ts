import { CandidateRegisterDTO } from "../DTO/Candidate/RegisterCandidate.dto";
import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { CandidateFullNameVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidatePhoneVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateBirthDateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateLocationVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { ICandidateRepository } from "../Repositories/CandidateRepository";
import { IApplicationService } from "../Core/IApplicationService";
import { SuspendCandidateDTO } from "../DTO/Candidate/SuspendCandidate.dto";
import { CouldNotFindCandidateError } from "../Repositories/Candidate/Errors/could-not-find-candidate.error";
import { CandidateConfiguration } from "../Configuration/Candidate/configuration.interface";
import { CandidateScheduler } from "../Scheduler/Candidate/scheduler.interface";
import { ReactivateCandidateDTO } from "../DTO/Candidate/ReactivateCandidate.dto";

export class CandidateApplicationService implements IApplicationService{

    constructor(
        private repository: ICandidateRepository,
        private configuration: CandidateConfiguration,
        private scheduler: CandidateScheduler
    ){}

    async Handle(command: any): Promise<void> {
        switch (command.constructor){
            
            case CandidateRegisterDTO: {
                
                let dto: CandidateRegisterDTO = <CandidateRegisterDTO> command

                let candidate = new Candidate(
                    new CandidateIdVo(),
                    new CandidateStateVo(CandidateStatesEnum.Active),
                    new CandidateFullNameVo(dto.name, dto.lastname),
                    new CandidatePhoneVo(dto.phoneCode, dto.phoneNumber),
                    new CandidateEmailVo(dto.email),
                    new CandidateBirthDateVo(new Date(dto.birthDate)),
                    new CandidateLocationVo(dto.latitude, dto.longitude),
                );
        
                await this.repository.save(candidate);
                break;
            }

            case SuspendCandidateDTO: {
                const id = (command as SuspendCandidateDTO).id,
                      until = (command as SuspendCandidateDTO).until,
                      candidate = await this.repository.getOne(id)
                if (!candidate) throw new CouldNotFindCandidateError(id)

                if (candidate.state.suspensionCount + 1 >= await this.configuration.getSuspensionLimit()) {
                    candidate.eliminateThisCandidate()
                    await this.repository.eliminate(candidate.id)
                } else {
                    candidate.suspendThisCandidate()
                    await this.scheduler.scheduleCandidateReactivation(candidate.id, until)
                    await this.repository.save(candidate)
                }
                break;
            }

            case ReactivateCandidateDTO: {
                const id = (command as ReactivateCandidateDTO).id,
                      candidate = await this.repository.getOne(id)
                    
                if (!candidate) throw new CouldNotFindCandidateError(candidate.id)

                candidate.reactivateThisCandidate()
                await this.repository.save(candidate)
                break;
            }
                
        }

    }
    
}