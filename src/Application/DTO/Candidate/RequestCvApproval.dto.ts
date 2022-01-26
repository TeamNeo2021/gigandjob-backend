export class RequestCvApprovalDTO{
    public cvID: string;
    public candidateID: string;
    public description: string;
    public workExperiences: Array<[any, any, any, any]>;
    /*public workExperiences: [string, Date, Date, String];
    public workExperienceDescription: string;
    public workExperienceStartDate: Date;
    public workExperienceFinishDate: Date;
    public workExperienceJob: string;
    public studies: [];
    */
    public studies: Array<[any, any, any, any, any]>;
    public photo: Buffer;
    public candidatebirthdate: Date;   
} 