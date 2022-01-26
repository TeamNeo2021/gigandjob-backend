import { OfferService } from "../../../ApplicationServices/OfferService.service";
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
    async save(): Promise<void>{
        
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

const fakeRepo: mockedOfferRepo = new mockedOfferRepo();

function create_offer_service(): OfferService{
    return new OfferService(fakeRepo);
}

const mockedDB: Offer[] = []



describe('Offer application service', () => {
    
    it('should succeed when instantiated normally', () => {
        expect(create_offer_service).not.toThrow(Error)
    });
    // it('should fail when command doesnt exist', () => {
        
    // });
    // it('should succeed when receives createOffer command', () => {
        
    // });
    // it('should fail when RandomUUID is repited in DB', () => {
        
    // });

});