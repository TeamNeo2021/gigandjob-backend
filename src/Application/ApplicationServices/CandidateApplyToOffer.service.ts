import { Candidate } from "src/Dominio/AggRoots/Candidate/Candidate";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { Application } from "src/Dominio/AggRoots/Offer/Application/Application";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { ApplyToOfferDTO } from "../DTO/Application/ApplyToOffer.dto";
import { ICandidateRepository } from "../Repositories/CandidateRepository";
import { IOfferRepository } from "../Repositories/OfferRepository.repo";

export class CandidateApplyToOffer{
    private commandRepository: ICandidateRepository;
    private offerRepository: IOfferRepository;
     constructor(commandRepository: ICandidateRepository, offerRepository: IOfferRepository){
         this.commandRepository = commandRepository;
         this.offerRepository = offerRepository;
     }

     public CandidateEmployerContract(application: Application, employer: Employer, offer: Offer){
         let dto: ApplyToOfferDTO = new ApplyToOfferDTO(
             offer._Id.value,
             application.getCandidateId().value,
             employer.employerId._guid_value,
             application.getBudget.value,
             offer._Description.value,
             application.getTime().days
         );         
     }
}