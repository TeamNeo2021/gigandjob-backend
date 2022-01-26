import {IApplicationService} from "../Core/IApplicationService"
import {ICVCommandRepository} from "../Repositories/CVCommandRepository.repo"
import {RequestCvApprovalDTO} from "../DTO/Candidate/RequestCvApproval.dto"
import { Cv, CvState } from "../../Dominio/AggRoots/CV/cv.root";
import { CvCandidate } from "../../Dominio/AggRoots/CV/ValueObjects/cvCandidate.object";
import { CvDescription } from "../../Dominio/AggRoots/CV/ValueObjects/cvDescription.object";
import { CvId } from "../../Dominio/AggRoots/CV/ValueObjects/cvId.object";
import { CvPhoto } from "../../Dominio/AggRoots/CV/ValueObjects/cvPhoto.object";
import { CvStudies } from "../../Dominio/AggRoots/CV/ValueObjects/cvStudies.object";
import { CvWorkExperience } from "../../Dominio/AggRoots/CV/ValueObjects/cvWorkExperience.object";
import { stringify } from "querystring";


export class RequestCvApprovalService{
    private commandRepository: ICVCommandRepository;

    constructor(commandRepository: ICVCommandRepository){
        this.commandRepository = commandRepository;
    }

    public RequestCvApproval(dto: RequestCvApprovalDTO): Cv{

        let Workxp : CvWorkExperience[];
        for (let i = 0; i < dto.workExperiences.length ; i++)
        {
            Workxp.push(dto.workExperiences[i][0],dto.workExperiences[i][1],dto.workExperiences[i][2],dto.workExperiences[i][3]);
        
        }

        let Studies : CvStudies[];
        for (let i = 0; i < dto.studies.length ; i++)
        {
            Studies.push(dto.studies[i][0],dto.studies[i][1],dto.studies[i][2],dto.studies[i][3],dto.studies[i][4]);
        
        }

        const submittedCv: Cv<CvState.Submitted> = Cv.submitCv(
            new CvDescription(dto.description),
            Workxp,
            Studies,
            new CvPhoto(dto.photo),
            new CvCandidate(dto.candidateID, dto.candidatebirthdate),
            new CvId(dto.cvID),
        );

        this.commandRepository.save(submittedCv);

        return submittedCv
    }

}