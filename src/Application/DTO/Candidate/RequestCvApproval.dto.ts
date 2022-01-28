import { type } from "os";
import { CvStudies } from "src/Dominio/AggRoots/CV/ValueObjects/cvStudies.object";
import { CvWorkExperience } from "src/Dominio/AggRoots/CV/ValueObjects/cvWorkExperience.object";


type work = {
    description: string,
    startDate: string,
    finishDate: string,
    job: string
}

type studies = {
    description: string
    startDate: string
    finishDate: string
    institution: string
    degree: string
}

export class RequestCvApprovalDTO{
    public cvID: string;
    public candidateID: string;
    public description: string;
    public workExperiences: [work];
    public studies: [studies]
    public photo: Buffer;
    public candidatebirthdate: string;
    
    constructor(cvID: string, candidateID: string, description: string, 
        workExperiences: [work], studies: [studies], photo: Buffer, candidatebirthdate: string){
            this.description = description,
            this.cvID = cvID,
            this.candidateID = candidateID,
            this.workExperiences = workExperiences,
            this.studies = studies,
            this.photo = photo,
            this.candidatebirthdate = candidatebirthdate
    }
} 
