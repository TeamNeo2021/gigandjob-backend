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


export class CvService implements IApplicationService {
    private commandRepository: ICVCommandRepository;

    constructor(commandRepository: ICVCommandRepository){
        this.commandRepository = commandRepository;
    }

    async Handle(command: any): Promise<void> {

        switch (command.constructor) {
            

            case RequestCvApprovalDTO: {

                let cmd: RequestCvApprovalDTO = <RequestCvApprovalDTO> command
                
                /*let Workxp : CvWorkExperience[];
                for (let i = 0; i < cmd.workExperiences.length ; i++)
                {
                    Workxp.push(cmd.workExperiences[i][0],cmd.workExperiences[i][1],cmd.workExperiences[i][2],cmd.workExperiences[i][3]);
                
                }

                let Studies : CvStudies[];
                for (let i = 0; i < cmd.studies.length ; i++)
                {
                    Studies.push(cmd.studies[i][0],cmd.studies[i][1],cmd.studies[i][2],cmd.studies[i][3],cmd.studies[i][4]);
                }*/

                let Workxp : CvWorkExperience[] = [];
                let Studies : CvStudies[] = [];
                for (const iterator of cmd.workExperiences) {

                    Workxp.push(new CvWorkExperience(iterator.description, new Date(iterator.startDate), new Date(iterator.finishDate), iterator.job));
                }

                for (const iterator of cmd.studies) {

                    Studies.push(new CvStudies(iterator.description, new Date(iterator.startDate), new Date(iterator.finishDate), iterator.institution, iterator.degree));
                }
                const submittedCv: Cv<CvState.Submitted> = Cv.submitCv(
                    new CvDescription(cmd.description),
                    Workxp,
                    Studies,
                    new CvPhoto(cmd.photo),
                    new CvCandidate(cmd.candidateID, new Date(cmd.candidatebirthdate)),
                    new CvId(cmd.cvID),
                );

                await this.commandRepository.save(submittedCv);
                

                break;
            }

            default:
                throw new Error(`CvService: Command doesn't exist: ${command.type}`);
                break;
        }
       
    }


    /*public RequestCvApproval(dto: RequestCvApprovalDTO): Cv{

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

        let submittedCv: Cv<CvState.Submitted> = Cv.submitCv(
            new CvDescription(dto.description),
            Workxp,
            Studies,
            new CvPhoto(dto.photo),
            new CvCandidate(dto.candidateID, dto.candidatebirthdate),
            new CvId(dto.cvID),
        );

        this.commandRepository.save(submittedCv);

        return submittedCv
    }*/

}