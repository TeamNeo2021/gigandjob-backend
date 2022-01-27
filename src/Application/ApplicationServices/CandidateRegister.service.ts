
import { CandidateRegisterDTO } from "../DTO/Candidate/RegisterCandidate.dto";
import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { CandidateFullNameVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidatePhoneVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateBirthDateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateLocationVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { ICandidateCommandRepository } from "../Repositories/CandidateCommandRepository.repo";
import { IApplicationService } from "../Core/IApplicationService";

export class CandidateRegisterService implements IApplicationService{
    private commandRepository: ICandidateCommandRepository;

    constructor(commandRepository: ICandidateCommandRepository){
        this.commandRepository = commandRepository;
    }
    
    Handle(command: any): void {
        let dto: CandidateRegisterDTO;
        
        try {
            dto = command;
        } catch (error) {
            throw new Error('No dto compatible');
        }

        let candidate = new Candidate(
            new CandidateIdVo(),
            new CandidateStateVo(CandidateStatesEnum.Active),
            new CandidateFullNameVo(dto.name, dto.lastname),
            new CandidatePhoneVo(dto.phoneCode, dto.phoneNumber),
            new CandidateEmailVo(dto.email),
            new CandidateBirthDateVo(new Date(dto.birthDate)),
            new CandidateLocationVo(dto.latitude, dto.longitude),
        );

        candidate = candidate.registerCandidate();

        this.commandRepository.save(candidate);
    }

    /*
    public RegisterCandidate(dto: CandidateRegisterDTO): Candidate{

        let candidate = new Candidate(
            new CandidateIdVo(),
            new CandidateStateVo(CandidateStatesEnum.Active),
            new CandidateFullNameVo(dto.name, dto.lastname),
            new CandidatePhoneVo(dto.phoneCode, dto.phoneNumber),
            new CandidateEmailVo(dto.email),
            new CandidateBirthDateVo(new Date(dto.birthDate)),
            new CandidateLocationVo(dto.latitude, dto.longitude),
        );

        candidate = candidate.registerCandidate();

        this.commandRepository.save(candidate);

        return candidate
    }
    */

}