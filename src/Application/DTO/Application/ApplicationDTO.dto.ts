class ApplicationDTO{
    public  id: string;
    public candidateId: string;
    public state: string;
    public previous_state: string;
    public budget: Number;
    public description: string;
    public duration_days: Number;

    constructor( applicationData: any)
{
    this.id = applicationData.id;
    this.candidateId = applicationData.candidateId;
    this.state = applicationData.state;
    this.previous_state = applicationData.previous_state;
    this.budget = applicationData.budget;
    this.description = applicationData.description;
    this.duration_days = applicationData.duration_days;

}}