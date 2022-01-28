import { Body, Controller, HttpCode, Post,Put } from '@nestjs/common';
import { OfferFirestoreRepository } from '../../../Infrastructure/Firestore/OfferFirestoreRepository.repo';
import { OfferService } from '../../../Application/ApplicationServices/OfferService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../../Application/DTO/Offer/ReactivateOfferDTO';
import { EliminitedOfferDTO } from './../../../Application/DTO/Offer/EliminitedOfferDTO';


@Controller('offer')
export class OfferApi {
    private readonly offerService: OfferService;
    private readonly repository: OfferFirestoreRepository;
    constructor(){
        this.repository = new OfferFirestoreRepository();
        this.offerService = new OfferService(this.repository);
    }

    @Post()
    @HttpCode(201)
    createOffer(
        @Body('direction') Dir: string,
        @Body('sector') Sector: string,
        @Body('budget') Budget: number,
        @Body('description') Desc: string
    ): string {
            let request: createOfferDTO = new createOfferDTO(
                Dir,
                Sector,
                Budget,
                Desc
            )
        this.offerService.Handle(request);
        return 'Offer has been created'
    }
    
    @Put("Reactived") // PUT /Offers/Reactived
    ReactivedOffer( @Body('idOffer')IdOffer:string ): any{
        let request:ReactivateOfferDTO= new ReactivateOfferDTO(IdOffer);
        this.offerService.Handle(request);
        return "Esta accion reactiva una oferta"
    }

    @Put("Eliminited") // PUT /Offers/Eliminited
    EliminitedOffer(@Body('idOffer')IdOffer:string): any{
        let request:EliminitedOfferDTO= new EliminitedOfferDTO(IdOffer);
        this.offerService.Handle(request);
        return "Esta accion elimina una oferta"
    }
}

