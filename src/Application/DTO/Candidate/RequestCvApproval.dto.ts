export class RequestCvApprovalDTO{
    public cvID: string;
    public candidateID: string;
    public description: string;
    public workExperiences: [
        {
            description: string,
            startDate: string,
            finishDate: string,
            job: string
        }
    ]
    public studies: [
        {

            description: string
            startDate: string
            finishDate: string
            institution: string
            degree: string
        }
    ]
    public photo: Buffer;
    public candidatebirthdate: string;   
} 