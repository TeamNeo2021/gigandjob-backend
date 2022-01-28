import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { OfferFirestoreRepository } from '../../../Infrastructure/Firestore/OfferFirestoreRepository.repo';
import { OfferApplicationService } from '../../../Application/ApplicationServices/Offer/OfferApplicationService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../../Application/DTO/Offer/ReactivateOfferDTO';
import { EliminitedOfferDTO } from './../../../Application/DTO/Offer/EliminitedOfferDTO';
import { ReportOfferDTO } from 'src/Application/DTO/Offer/ReportOffer.dto';
import { ICandidateRepository } from 'src/Application/Repositories/CandidateRepository';
import { INotificationSender } from 'src/Application/Ports/INotificationSender';

type ReportBody = {
  reason: string;
  reporterId: string;
};

type ReactivateOfferBody = {
  id: string;
};

@Controller('offer')
export class OfferController {
    private readonly offerApplicationService: OfferApplicationService;
    private readonly Offerrepo: OfferFirestoreRepository;
    private readonly CandidaterepoC: ICandidateRepository;
    private readonly Sender: INotificationSender;
    constructor(offerRepo: OfferFirestoreRepository){
        this.Offerrepo = offerRepo;
        this.offerApplicationService = 
            new OfferApplicationService(
                this.Offerrepo,
                this.CandidaterepoC,
                this.Sender);
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
    ReactivedOffer( @Body('idOffer')IdOffer:string ): any{
        let request:ReactivateOfferDTO= new ReactivateOfferDTO(IdOffer);
        this.offerApplicationService.Handle(request);
        return "Esta accion reactiva una oferta"
    }

    @Put("Eliminited") // PUT /Offers/Eliminited
    EliminitedOffer(@Body('idOffer')IdOffer:string): any{
        let request:EliminitedOfferDTO= new EliminitedOfferDTO(IdOffer);
        this.offerApplicationService.Handle(request);
        return "Esta accion elimina una oferta"
    }
    
    @Post(':id/report')
    async reportOffer(@Param('id') id: string, @Body() report: ReportBody) {
        await this.offerApplicationService.Handle(new ReportOfferDTO(id, report.reason, report.reporterId))
        return {
            reportedOffer: id,
            reason: report.reason
        }
    }
}
