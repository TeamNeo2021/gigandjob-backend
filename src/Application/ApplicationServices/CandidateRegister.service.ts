
import { CandidateRegisterDTO } from "../DTO/Candidate/RegisterCandidate.dto";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidateCommandRepository } from "../Repositories/CandidateCommandRepository.repo";
import { CandidateQuerryRepository } from "../Repositories/CandidateQuerryRepository.repo";

export class CandidateRegisterService{
    private commandRepository: CandidateCommandRepository;

    constructor(commandRepository: CandidateCommandRepository, querryRepository: CandidateQuerryRepository){
        this.commandRepository = commandRepository;
    }

    public RegisterCandidate(dto: CandidateRegisterDTO){

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

}