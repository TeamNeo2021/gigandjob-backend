import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { ICandidateRepository } from "../Repositories/CandidateRepository";

export class CandidateEliminateService{
    private commandRepository: ICandidateRepository;

    constructor(commandRepository: ICandidateRepository){
        this.commandRepository = commandRepository;
    }

    public eliminateCandidate(id: CandidateIdVo): void{
        this.commandRepository.eliminate(id.value);
    }
}