import { OfferApplicationService } from "../../../ApplicationServices/Offer/OfferApplicationService.service";
import { IOfferRepository } from "../../../Repositories/OfferRepository.repo";
import { Offer } from "../../../../Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferLocationVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { createOfferDTO } from "../../../DTO/Offer/CreateOffer.dto";
import { InMemoryCandidateCommandRepository } from "../../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { MockSenderAdapter } from "../../../../Infrastructure/Memory/MorckSenderAdapter";
import { MockEmployerRepo } from "../../../../Infrastructure/Memory/MockEmployerRepo.repo";
import { LikeOfferDTO } from "../../../DTO/Offer/LikeOfferDTO.dto";
import { OfferDTO } from "../../../DTO/Offer/OfferDTO";
import { Application } from "../../../../Dominio/AggRoots/Offer/Application/Application";
import { LocationDTO } from "../../../DTO/Location.dto"
import { ApplicationDTO } from "src/Application/DTO/Application/ApplicationDTO.dto";

const exampleDirection:LocationDTO = new LocationDTO(
  {
    latitude:0,
    longitude:0
  }
);
const exampleSector:string = 'Laws';
const exampleBudget:number = 10;
const exampleDescription:string = 'Lorem ipsum dolor sit amet.'

const MCCrepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const EMrepo = new MockEmployerRepo();

class mockedOfferRepo implements IOfferRepository {
  private mockedState: OfferStateVO = new OfferStateVO(OfferStatesEnum.Active);
  private mockedPublicationDate: PublicationDateVO = PublicationDateVO.Create(
    new Date(),
  );
  private mockedRating: RatingVO = RatingVO.Create(0);
  private mockedDirection: OfferLocationVO = new OfferLocationVO(
    0,0 //Latitude, Longitude
  );
  private mockedSector: SectorVO = new SectorVO(Sectors.Laws);
  private mockedBugget: BudgetVO = BudgetVO.Create(10);
  private mockedDescription: DescriptionVO = DescriptionVO.Create(
    'Lorem ipsum dolor sit amet.',
  );
  private mockedApplications: Application[] = [];
  private mockedReports: { reporterId: string, reason: string }[]

  getAll(): Promise<OfferDTO[]> {
    throw new Error("Method not implemented.");
  }
  async exists(id: string): Promise<boolean> {
    return false;
  }
  likeOffer(data: LikeOfferDTO) {
    throw new Error('Method not implemented.');
  }
  async save(offer: OfferDTO): Promise<void> {
    let _offer = Offer.CreateOffer(
      new OfferStateVO(<OfferStatesEnum><unknown>offer.State),
      PublicationDateVO.Create(offer.PublicationDate),
      RatingVO.Create(offer.Rating),
      new OfferLocationVO(0,0),
      new SectorVO(<Sectors><unknown>offer.Sector),
      BudgetVO.Create(offer.Budget),
      DescriptionVO.Create(offer.Description),
      new OfferIdVO(offer.OfferId)
    )
    mockedDB.push(_offer);
  }
  async getOfferById(id: string): Promise<OfferDTO> {
    
    let returned_offer: OfferDTO = new OfferDTO({
      OfferId: id,
      State: this.mockedState.state,
      PublicationDate: this.mockedPublicationDate.value,
      Rating: this.mockedRating.value,
      Direction: this.mockedDirection,
      Sector: this.mockedSector.value,
      Budget: this.mockedBugget.value,
      Description: this.mockedDescription.value,
      reports:this.mockedReports,
      applications: this.mockedApplications.map(application => new ApplicationDTO({
        applicationId: application.guid.value,
        state: application.state.current,
        candidateId: application.candidateId.value,
        previous_state: application.previous_state.current,
        budget: application.budget.value,
        description: application.description.value,
        duration_days: application.time.days,
      }))
    }
      
    );

    return returned_offer;
  }
}

class invalidCommand {}

const exampleOffer = Offer.CreateOffer(
  new OfferStateVO(OfferStatesEnum.Active),
  PublicationDateVO.Create(new Date('1999-05-13')),
  RatingVO.Create(5),
  new OfferLocationVO(0,0),
  new SectorVO(Sectors.Technology),
  BudgetVO.Create(1500),
  DescriptionVO.Create('descripcion de prueba'),
);

const valid_command: createOfferDTO = new createOfferDTO(
  {
    Direction:exampleDirection,
    Budget: exampleBudget,
    Sector: exampleSector,
    Description: exampleDescription
  }
);
const invalid_command: invalidCommand = {};

const fakeRepo: mockedOfferRepo = new mockedOfferRepo();

var mockedDB: Offer[] = [];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function create_offer_service(): OfferApplicationService{
    return new OfferApplicationService(fakeRepo,MCCrepo, EMrepo, Msender);
}

describe('Offer application service', () => {
  it('should succeed when instantiated normally', () => {
    expect(create_offer_service).not.toThrow(Error);
  });
  it('should fail when command doesnt exist', async () => {
    let actualService: OfferApplicationService = create_offer_service();
    let error: Error = undefined;
    await actualService.Handle(invalid_command).catch((err) => (error = err));
    expect(error).toBeDefined();
  });
  it('should succeed when receives createOffer command', async () => {
    let actualService: OfferApplicationService = create_offer_service();
    let error: Error = undefined;
    await actualService.Handle(valid_command).catch((err) => (error = err));
    expect(error).not.toBeDefined();
  });
  it('should save the new offer in DB', async () => {
    let actualService: OfferApplicationService = create_offer_service();
    let previousDB_length: number = mockedDB.length;
    await actualService.Handle(valid_command);
    expect(mockedDB.length).toEqual(previousDB_length + 1);
  });
});
