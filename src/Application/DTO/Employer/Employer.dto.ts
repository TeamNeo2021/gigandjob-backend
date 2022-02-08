import { LocationDTO } from "../Location.dto";
import { OfferDTO } from "../Offer/OfferDTO";

export class EmployerDTO{
    public employerId: string;
    public name: string;
    public description: string;
    public state: string;
    public location: LocationDTO;
    public rif: string;
    public phone: string;
    public mail: string;
    public comDesignation: string;
    public offers : OfferDTO[] = [];

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
    this.comDesignation = employerData.comDesignation;
    this.offers = employerData.offers;
	}
}
