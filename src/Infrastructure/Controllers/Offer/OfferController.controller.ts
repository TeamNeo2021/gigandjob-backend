import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { OfferFirestoreRepository } from '../../Firestore/OfferFirestoreAdapter.adapter.';
import { OfferApplicationService } from '../../../Application/ApplicationServices/Offer/OfferApplicationService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../../Application/DTO/Offer/ReactivateOfferDTO';
import { EliminatedOfferDTO } from './../../../Application/DTO/Offer/EliminatedOfferDTO';
import { ReportOfferDTO } from '../../../Application/DTO/Offer/ReportOffer.dto';
import { ICandidateRepository } from '../../../Application/Repositories/CandidateRepository';
import { INotificationSender } from '../../../Application/Ports/INotificationSender';

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

    @Put("Eliminated") // PUT /Offers/Eliminated
    EliminatedOffer(@Body('idOffer')IdOffer:string): any{
        let request:EliminatedOfferDTO= new EliminatedOfferDTO(IdOffer);
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

 
    //APPLICATION 

    @Put('/applyToOffer')
    async apply(
        @Body ('idOffer') idOffer:string, 
        @Body ('idCandidate') idCandidate:string,
        @Body ('idEmployer') idEmployer:string,
        @Body  ('idApplication') idApplication:string,
    //@Body( 'state') state: string,
  //  @Body ('previous_state') previous_state: string,
    @Body( 'budget') budget: Number,
    @Body ('description') description: string,
    @Body( 'duration_days')duration_days : Number,
    ){
        let newApplication = new ApplyToOfferDTO(
            {
                applicationId: idApplication,
                offerId: idOffer,
                employerId: idEmployer,
                candidateId: idCandidate,
               // state: state,
              //  previous_state: previous_state,
                budget: budget,
                description: description,
                duration_days: duration_days

            }
        );
        await this.offerApplicationService.Handle(newApplication);

    }
    
    @Put('likeOffer')
    async likeOffer(
        @Body('id_candidate') id_candidate: string,
        @Body('id_offer') id_offer: string,
        @Body('date') date: Date
        ) {
        let result = await this.offerApplicationService.Handle(new LikeOfferDTO(
            {
                id_candidate: id_candidate,
                 id_offer: id_offer,
                  date: date
            }
        ));
        return ({
            message: 'Offer Liked',
            result: result
        })
    }
}
