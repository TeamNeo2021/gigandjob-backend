import { Offer } from "../../Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { PublicationDateVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { IApplicationService } from ".././Core/IApplicationService";
import { createOfferDTO } from "../DTO/Offer/CreateOffer.dto";
import { IOfferRepository } from "../Repositories/OfferRepository.repo";


export class OfferApplicationService implements IApplicationService {

    private readonly repository: IOfferRepository;

    constructor(repo: IOfferRepository){
        this.repository = repo;
    }

    Handle(command: any): void {
        console.log(command.constructor == createOfferDTO)
        switch (command.constructor) {
            
            case createOfferDTO: this.createOffer(command)

                break;
            
            

            // case LikeOffer:

            //     break;
            // case applyToOffer:

            //     break;

            default:
                throw Error(`OfferService: Command doesn't exist: ${command.constructor}`);            
        }
       
    }

    async createOffer(command:any): Promise<void>{
        console.log('inicio');
            // cast command to get intellisense
            let cmd: createOfferDTO = <createOfferDTO> command

            //! This is tresspassing aggregate offer
            //! by accesing directly to its VO's
            let new_offer = Offer.CreateOffer(
                new OfferStateVO(<OfferStatesEnum><unknown>cmd.State),
                new PublicationDateVO(cmd.PublicationDate),
                new RatingVO(cmd.Rating),
                new DirectionVO(cmd.Direction),
                new SectorVO(<Sectors><unknown>cmd.Sector),
                new BudgetVO(cmd.Budget),
                new DescriptionVO(cmd.Description)
            )
            

            //This should never happen, but in case RandomUUID generates
            //an used UUID, this will stop the creation
            if (await this.repository.exists(new_offer._Id)){
                throw new Error("This offer ID is already registered");
            }
            console.log('voy a salvar');
            //Save the new offer
            await this.repository.save(new_offer);        

        
      
       }

}