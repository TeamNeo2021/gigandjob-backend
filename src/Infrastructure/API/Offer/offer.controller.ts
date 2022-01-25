import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OfferFirestoreRepository } from '../../../Infrastructure/Firestore/OfferFirestoreRepository.repo';
import { OfferService } from '../../../Application/ApplicationServices/OfferService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';


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
}

