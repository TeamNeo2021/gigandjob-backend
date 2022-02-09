import {
  Body,
  ConsoleLogger,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OfferFirestoreAdapter } from '../../Firestore/OfferFirestoreAdapter.adapter';
import { OfferApplicationService } from '../../../Application/ApplicationServices/Offer/OfferApplicationService.service';
import { createOfferDTO } from '../../../Application/DTO/Offer/CreateOffer.dto';
import { ReactivateOfferDTO } from '../../../Application/DTO/Offer/ReactivateOfferDTO';
import { EliminatedOfferDTO } from './../../../Application/DTO/Offer/EliminatedOfferDTO';
import { ReportOfferDTO } from '../../../Application/DTO/Offer/ReportOffer.dto';
import { ICandidateRepository } from '../../../Application/Repositories/CandidateRepository';
import { INotificationSender } from '../../../Application/Ports/INotificationSender';
import { EmployerRepositoryService } from 'src/Infrastructure/Firestore/Employer/repository/repository.service';
import { ApplyToOfferDTO } from '../../../Application/DTO/Application/ApplicationDTO.dto';
import { LikeOfferDTO } from '../../../Application/DTO/Offer/LikeOfferDTO.dto';
import { ApplicationStates } from 'src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates';
import { OfferQueryFirestoreAdapter } from 'src/Infrastructure/Firestore/OfferMobileQueryFirestoreAdapter';
import { LocationDTO } from 'src/Application/DTO/Location.dto';
import { InvalidOfferDirection } from 'src/Dominio/AggRoots/Offer/Errors/InvalidOfferDirection.error';
import { CandidateFirestoreAdapter } from 'src/Infrastructure/Firestore/CandidateFirestoreAdapter.adapter';

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
  private readonly Offerrepo: OfferFirestoreAdapter;
  private readonly Employerrepo: EmployerRepositoryService;
  private readonly Sender: INotificationSender;
  constructor(
    offerRepo: OfferFirestoreAdapter,
    private OfferQueryRepo: OfferQueryFirestoreAdapter,
    private CandidaterepoC: CandidateFirestoreAdapter,
  ) {
    this.Offerrepo = offerRepo;
    this.offerApplicationService = new OfferApplicationService(
      this.Offerrepo,
      this.CandidaterepoC,
      this.Employerrepo,
      this.Sender,
    );
  }

  @Post()
  @HttpCode(201)
  createOffer(
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
    @Body('sector') Sector: string,
    @Body('budget') Budget: number,
    @Body('description') Description: string,
  ): string {
    let request: createOfferDTO = new createOfferDTO({
      Direction: {
        latitude,
        longitude,
      },
      Sector: Sector,
      Budget: Budget,
      Description: Description,
    });
    this.offerApplicationService.Handle(request);
    return 'Offer has been created';
  }

  @Put('Reactived') // PUT /Offers/Reactived
  ReactivedOffer(@Body('idOffer') IdOffer: string): any {
    let request: ReactivateOfferDTO = new ReactivateOfferDTO(IdOffer);
    this.offerApplicationService.Handle(request);
    return 'Esta accion reactiva una oferta';
  }

  @Put('Eliminated') // PUT /Offers/Eliminated
  EliminatedOffer(@Body('idOffer') IdOffer: string): any {
    let request: EliminatedOfferDTO = new EliminatedOfferDTO(IdOffer);
    this.offerApplicationService.Handle(request);
    return 'Esta accion elimina una oferta';
  }

  @Post(':id/report')
  async reportOffer(@Param('id') id: string, @Body() report: ReportBody) {
    await this.offerApplicationService.Handle(
      new ReportOfferDTO(id, report.reason, report.reporterId),
    );
    return {
      reportedOffer: id,
      reason: report.reason,
    };
  }

  //APPLICATION

  @Put('/applyToOffer')
  async apply(
    @Body('idOffer') idOffer: string,
    @Body('idCandidate') idCandidate: string,
    @Body('idEmployer') idEmployer: string,
    //@Body  ('idApplication') idApplication:string,
    @Body('state') state: string,
    //@Body ('previous_state') previous_state: string,
    @Body('budget') budget: number,
    @Body('description') description: string,
    @Body('duration_days') duration_days: number,
  ) {
    console.log("estoy en controlador")
    let newApplication = new ApplyToOfferDTO({
      offerId: idOffer,
      employerId: idEmployer,
      candidateId: idCandidate,
      state: ApplicationStates[state],
      //  previous_state: previous_state,
      budget: budget,
      description: description,
      duration_days: duration_days,
    });
    console.log("estoy en controlador y voy al service")
    await this.offerApplicationService.Handle(newApplication);
  }

  @Put('likeOffer')
  async likeOffer(
    @Body('id_candidate') id_candidate: string,
    @Body('id_offer') id_offer: string,
    @Body('date') date: Date,
  ) {
    let result = await this.offerApplicationService.Handle(
      new LikeOfferDTO({
        id_candidate: id_candidate,
        id_offer: id_offer,
        date: date,
      }),
    );
    return {
      message: 'Offer Liked',
      result: result,
    };
  }

  @Get('getall')
  @HttpCode(200)
  @Header('Access-Control_Allow_Origin', '*')
  async getAll() {
    const query = await this.OfferQueryRepo.getAll();
    console.log(query)
    if (!query)
      throw new HttpException(
        'Could not find a register with that date',
        HttpStatus.NO_CONTENT,
      );
    return query;
  }

  @Get(':id/getone')
  @HttpCode(200)
  @Header('Access-Control_Allow_Origin', '*')
  async getOne(@Param('id') offerId: string) {
    const query = await this.OfferQueryRepo.getOne(offerId);
    console.log(query)
    if (!query)
      throw new HttpException(
        'Could not find a register with that date',
        HttpStatus.NO_CONTENT,
      );
    return query;
  }
}
