import { Body, Controller, HttpCode, Param, Post, Put } from '@nestjs/common';
import { OfferFirestoreRepository } from '../../../Infrastructure/Firestore/OfferFirestoreRepository.repo';
import { OfferService } from '../../../Application/ApplicationServices/OfferService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../../Application/DTO/Offer/ReactivateOfferDTO';
import { EliminitedOfferDTO } from './../../../Application/DTO/Offer/EliminitedOfferDTO';
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
export class OfferApi {
  private readonly offerService: OfferService;
  constructor(
    private repository: OfferFirestoreRepository,
    private candidaterepo: ICandidateRepository,
    private sender: INotificationSender,
  ) {
    this.offerService = new OfferService(
      this.repository,
      this.candidaterepo,
      this.sender,
    );
  }

  @Post()
  @HttpCode(201)
  createOffer(
    @Body('direction') Dir: string,
    @Body('sector') Sector: string,
    @Body('budget') Budget: number,
    @Body('description') Desc: string,
  ): string {
    let request: createOfferDTO = new createOfferDTO(Dir, Sector, Budget, Desc);
    this.offerService.Handle(request);
    return 'Offer has been created';
  }

  @Put('Reactived') // PUT /Offers/Reactived
  ReactivedOffer(@Body('idOffer') IdOffer: string): any {
    let request: ReactivateOfferDTO = new ReactivateOfferDTO(IdOffer);
    this.offerService.Handle(request);
    return 'Esta accion reactiva una oferta';
  }

  @Put('Eliminited') // PUT /Offers/Eliminited
  EliminitedOffer(@Body('idOffer') IdOffer: string): any {
    let request: EliminitedOfferDTO = new EliminitedOfferDTO(IdOffer);
    this.offerService.Handle(request);
    return 'Esta accion elimina una oferta';
  }

  @Post(':id/report')
  async reportOffer(@Param('id') id: string, @Body() report: ReportBody) {
    await this.offerService.Handle(
      new ReportOfferDTO(id, report.reason, report.reporterId),
    );
    return {
      reportedOffer: id,
      reason: report.reason,
    };
  }
}
