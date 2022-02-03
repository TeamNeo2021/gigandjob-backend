export class EmployerDTO {
  public employerId: String;
  public name: String;
  public description: String;
  public state: String;
  public location: LocationDTO;
  public rif: String;
  public phone: String;
  public mail: String;
  //  public comDesignation: EmployerComercialDesignationVO;

  constructor(employerData: any) {
    this.employerId = employerData.employerId;
    this.name = employerData.name;
    this.description = employerData.description;
    this.state = employerData.state;
    this.location = new LocationDTO(employerData.location);
    this.rif = employerData.rif;
    this.phone = employerData.phone;
    this.mail = employerData.mail;
  }
}
