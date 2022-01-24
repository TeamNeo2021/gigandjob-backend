
import { CandidateRegisterDTO } from "../DTO/Candidate/RegisterCandidate.dto";
import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { CandidateFullNameVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidatePhoneVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateBirthDateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateLocationVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidateCommandRepository } from "../Repositories/CandidateCommandRepository.repo";

export class CandidateRegisterService{
    private commandRepository: CandidateCommandRepository;

    constructor(commandRepository: CandidateCommandRepository){
        this.commandRepository = commandRepository;
    }

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

}