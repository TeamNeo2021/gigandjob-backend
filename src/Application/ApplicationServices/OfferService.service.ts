import { OfferIdVO } from "../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
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
import { ReactivateOfferDTO } from "../DTO/Offer/ReactivateOfferDTO";
import { EliminitedOfferDTO } from "../DTO/Offer/EliminitedOfferDTO";
import { IOfferRepository } from "../Repositories/OfferRepository.repo";


export class OfferService implements IApplicationService {

    private readonly repository: IOfferRepository;

    constructor(repo: IOfferRepository){
        this.repository = repo;
    }

    async Handle(command: any): Promise<void> {

        switch (command.constructor) {
            

            case createOfferDTO: {

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
                if (this.repository.exists(new_offer._Id)){
                    throw new Error("This offer ID is already registered");
                }

                //Save the new offer
                await this.repository.save(new_offer);
                

                break;
            }

            case ReactivateOfferDTO:{
                let cmd: ReactivateOfferDTO = <ReactivateOfferDTO> command;
                let Offer_Reactived= await this.repository.load(new OfferIdVO(cmd.id_offer));
                Offer_Reactived.ReactivateOffer();
                await this.repository.save(Offer_Reactived);
                break;
            }

            case EliminitedOfferDTO:{
                
                let cmd: EliminitedOfferDTO = <EliminitedOfferDTO> command;
                let Offer_Eliminited= await this.repository.load(new OfferIdVO(cmd.id_offer));
                Offer_Eliminited.EliminateOffer();
                await this.repository.save(Offer_Eliminited);
                break;
            }
            // case LikeOffer:

            //     break;
            // case applyToOffer:

            //     break;

            default:
                throw new Error(`OfferService: Command doesn't exist: ${command.type}`);
                break;
        }
       
    }

}