import { OfferApplicationService } from "../../../ApplicationServices/OfferService.service";
import { IOfferRepository } from "../../../Repositories/OfferRepository.repo";
import { Offer } from "../../../../Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStatesEnum, OfferStateVO } from "../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { createOfferDTO } from "../../../DTO/Offer/CreateOffer.dto";


const exampleDirection:string = 'testing direction';
const exampleSector:string = 'testing sector';
const exampleBudget:number = 10;
const exampleDescription:string = 'Lorem ipsum dolor sit amet.'

class mockedOfferRepo implements IOfferRepository{

    private mockedState: OfferStateVO = new OfferStateVO(OfferStatesEnum.Active);
    private mockedPublicationDate: PublicationDateVO = new PublicationDateVO(new Date());
    private mockedRating: RatingVO = new RatingVO(0);
    private mockedDirection: DirectionVO = new DirectionVO('Lorem ipsum dolor sit amet.');
    private mockedSector: SectorVO = new SectorVO(Sectors.Laws);
    private mockedBugget: BudgetVO = new BudgetVO(10);
    private mockedDescription: DescriptionVO = new DescriptionVO('Lorem ipsum dolor sit amet.');


    async exists(id: OfferIdVO): Promise<boolean> {
        return false;
    }
    likeOffer(data: LikeOfferDTO) {
        throw new Error("Method not implemented.");
    }
    async save(offer: Offer): Promise<void>{
       mockedDB.push(offer);
    }
    async load(id: OfferIdVO): Promise<Offer>{
        let returned_offer: Offer = new Offer(
            id,
            this.mockedState,
            this.mockedPublicationDate,
            this.mockedRating,
            this.mockedDirection,
            this.mockedSector,
            this.mockedBugget,
            this.mockedDescription
        )

        return returned_offer;
    }
}

class invalidCommand{

}

const exampleOffer = Offer.CreateOffer(
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date('1999-05-13')),
    new RatingVO(5),
    new DirectionVO("AV Francisco de Miranda"),
    new SectorVO(Sectors.Technology),
    new BudgetVO(1500),
    new DescriptionVO("descripcion de prueba")
);

const valid_command: createOfferDTO = new createOfferDTO(
    exampleDirection,
    exampleSector,
    exampleBudget,
    exampleDescription
);
const invalid_command: invalidCommand = {};


const fakeRepo: mockedOfferRepo = new mockedOfferRepo();

var mockedDB: Offer[] = [
]

const delay = ms => new Promise(res => setTimeout(res, ms));

function create_offer_service(): OfferApplicationService{
    return new OfferApplicationService(fakeRepo);
}



describe('Offer application service', () => {
    
    it('should succeed when instantiated normally', () => {
        expect(create_offer_service).not.toThrow(Error)
    });
    it('should fail when command doesnt exist', async () => {
        let actualService: OfferApplicationService = create_offer_service();
        let error: Error = undefined
        await actualService.Handle(invalid_command).catch( err => error = err)
        expect(error).toBeDefined();
    });
    it('should succeed when receives createOffer command', async() => {
        let actualService: OfferApplicationService = create_offer_service();
        let error: Error = undefined
        await actualService.Handle(valid_command).catch( err => error = err)
        expect(error).not.toBeDefined();
    });
    it('should save the new offer in DB',async () => {
        let actualService: OfferApplicationService = create_offer_service();
        let previousDB_length: number = mockedDB.length;
        await actualService.Handle(valid_command);
        expect(mockedDB.length).toEqual(previousDB_length+1);
    });

});