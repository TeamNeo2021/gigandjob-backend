import { CandidateRepository } from "../Repositories/CandidateRepository.repo";
import { IApplicationService } from ".././Core/IApplicationService";
import { CandidateRegisterDTO } from "../DTO/Candidate/registerCandidate.dto";
import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateStatesEnum, CandidateStateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidatePhoneVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateLocationVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";

export class CandidateRegisterService{
    private repository: CandidateRepository;

    constructor(repository: CandidateRepository){
        this.repository = repository;
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

        this.repository.save(candidate);

        return candidate
    }

}