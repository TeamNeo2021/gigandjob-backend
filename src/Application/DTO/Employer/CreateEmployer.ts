
class CreateEmployerDTO{
 
    public name: string;
    public description: string;
    public state: string;
    public location: LocationDTO;
    public rif: string;
    public phone: string;
    public mail: string;
    public comDesignation: string;

	constructor(
    employerData:any
  ) {
   
    this.name = employerData.name;
    this.description = employerData.description;
    this.state = employerData.state;
    this.location = new LocationDTO(employerData.location);
    this.rif = employerData.rif;
    this.phone = employerData.phone;
    this.mail = employerData.mail;
    this.comDesignation = employerData.comDesignation;
	}
}
