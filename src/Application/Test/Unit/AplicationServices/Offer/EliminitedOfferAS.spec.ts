import {MockOfferRepo} from "../../../../../Infrastructure/Memory/MockOfferRepo.repo";
import { Offer } from "../../../../../Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { SectorVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { Sectors } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo";
import { OfferStateVO } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { OfferStatesEnum } from "../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo";
import { randomUUID } from 'crypto';
import {IOfferRepository} from "../../../../../Application/Repositories/OfferRepository.repo";
import {OfferApplicationService} from "../../../../ApplicationServices/Offer/OfferApplicationService.service";
import { EliminitedOfferDTO } from "../../../../DTO/Offer/EliminitedOfferDTO";



const exampleOffer2 = new Offer(
    new OfferIdVO(randomUUID()),
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date()),
    new RatingVO(0),
    new DirectionVO('direction'),
    new SectorVO(Sectors.Laws),
    new BudgetVO(400),
    new DescriptionVO('Oferta de prueba'),
  );

  const exampleOffer3 = new Offer(
    new OfferIdVO(randomUUID()),
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date()),
    new RatingVO(0),
    new DirectionVO('direction'),
    new SectorVO(Sectors.Laws),
    new BudgetVO(400),
    new DescriptionVO('Oferta de prueba'),
  );

const Orepo = new MockOfferRepo();

  function create_Service(repoO: IOfferRepository): OfferApplicationService {
    const service = new OfferApplicationService(repoO);
    return service;
  }

  describe('Eliminar una oferta', () => {
    it('debe tener éxito al eliminar una oferta cuando esta activa', async () =>{
        await Orepo.save(exampleOffer2);
        let exampleOffer:Offer =await Orepo.load(new OfferIdVO(exampleOffer2._Id.value));
        let ExCommand = new EliminitedOfferDTO((await exampleOffer)._Id.value);
        let OfferService=create_Service(Orepo);
        OfferService.Handle(ExCommand);
        let oferReactived:Offer = await Orepo.load(exampleOffer._Id);
        expect(
            () => oferReactived._State.state.toString() == OfferStatesEnum.Eliminated.toString()
          );
    });
    it('no debe tener éxito cuando una oferta esta cerrada', async () =>{
        await Orepo.save(exampleOffer3);
        let exampleOffer:Offer =await Orepo.load(new OfferIdVO(exampleOffer3._Id.value));
        exampleOffer._State.state=OfferStatesEnum.Closed;
        let ExCommand = new EliminitedOfferDTO((await exampleOffer)._Id.value);
        let OfferService=create_Service(Orepo);
        let error: any = undefined;
        await OfferService.Handle(ExCommand).catch((err) => (error = err));
        expect(() => {
            throw error;
        }).toThrowError(error);
    });    
  });