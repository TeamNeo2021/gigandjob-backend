import { Body, Controller, HttpCode, Post,Put } from '@nestjs/common';
import { OfferFirestoreRepository } from '../../Firestore/OfferFirestoreRepository.repo';
import { OfferApplicationService } from '../../../Application/ApplicationServices/Offer/OfferApplicationService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../../Application/DTO/Offer/ReactivateOfferDTO';
import { EliminitedOfferDTO } from '../../../Application/DTO/Offer/EliminitedOfferDTO';


@Controller('offer')
export class OfferApi {
    private readonly offerApplicationService: OfferApplicationService;
    private readonly repository: OfferFirestoreRepository;
    constructor(){
        this.repository = new OfferFirestoreRepository();
        this.offerApplicationService = new OfferApplicationService(this.repository);
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
        this.offerApplicationService.Handle(request);
        return 'Offer has been created'
    }
    
    @Put("Reactived") // PUT /Offers/Reactived
    ReactivedOffer(@Body() request:ReactivateOfferDTO): any{
        this.offerApplicationService.Handle(request);
        return "Esta accion reactiva una oferta"
    }

    @Put("Eliminited") // PUT /Offers/Eliminited
    EliminitedOffer(@Body() request:EliminitedOfferDTO): any{
        this.offerApplicationService.Handle(request);
        return "Esta accion elimina una oferta"
    }
}

