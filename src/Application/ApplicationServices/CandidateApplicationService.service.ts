import { CandidateRegisterDTO } from "../DTO/Candidate/RegisterCandidate.dto";
import { Candidate } from "../../Dominio/AggRoots/Candidate/Candidate";
import { CandidateIdVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { CandidateFullNameVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidatePhoneVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateEmailVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateBirthDateVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateLocationVo } from "../../Dominio/AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { ICandidateRepository } from "../Repositories/CandidateRepository.repo";
import { IApplicationService } from "../Core/IApplicationService";

export class CandidateApplicationService implements IApplicationService{
    private repository: ICandidateRepository;
    private transactionService;
    private publisher;

    constructor(
        repository: ICandidateRepository,
        suspensionRepository?,
        configuration?,
        publisher?
    ){
        this.repository = repository;
        /* this.transactionService = {
            getSuspensionCount: (id: string) => suspensionRepository.getSuspensionCount(id),
            getSuspensionLimit: () => configuration.getSuspensionLimit()
        }
        this.publisher */
    }

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
            }
                
        }

    }
    
}