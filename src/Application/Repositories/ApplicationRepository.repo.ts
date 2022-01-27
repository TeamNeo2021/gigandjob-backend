export interface ApplicationRepository{
    repository: any;

    newApllication(new_application: ApplicationDTO): ApplicationDTO;

    cancelApplication(application_id: String);

}