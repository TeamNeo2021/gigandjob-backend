export interface IApplicationRepository{ //todo Delete this, this goes in IOfferRepository
  
    newApllication(new_application: ApplicationDTO): Promise<void>;

    findById(id: string): Promise<ApplicationDTO>;

    findAll(): Promise<ApplicationDTO[]>;

    cancelApplication(application_id: string);

}