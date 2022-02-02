export interface IApplicationRepository{ //todo Delete this, this goes in IOfferRepository
  
   // newApllication(new_application: ApplyToOfferDTO): Promise<void>;

    findById(id: string): Promise<ApplyToOfferDTO>;

    findAll(): Promise<ApplyToOfferDTO[]>;

    cancelApplication(application_id: string);

}