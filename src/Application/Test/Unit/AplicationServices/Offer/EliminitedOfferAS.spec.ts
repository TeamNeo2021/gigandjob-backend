import { MockOfferRepo } from '../../../../../Infrastructure/Memory/MockOfferRepo.repo';
import { Offer } from '../../../../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferLocationVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { OfferIdVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { PublicationDateVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import { SectorVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import { Sectors } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import { OfferStateVO } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { OfferStatesEnum } from '../../../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { randomUUID } from 'crypto';
import {IOfferRepository} from "../../../../../Application/Repositories/OfferRepository.repo";
import {OfferApplicationService} from "../../../../ApplicationServices/Offer/OfferApplicationService.service";
import { EliminatedOfferDTO } from "../../../../DTO/Offer/EliminatedOfferDTO";
import { MockSenderAdapter } from "src/Infrastructure/Memory/MorckSenderAdapter";
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { MockEmployerRepo } from '../../../../../Infrastructure/Memory/MockEmployerRepo.repo';
import { LocationDTO } from 'src/Application/DTO/Location.dto';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';
import { InvalidOfferState } from 'src/Dominio/AggRoots/Offer/Errors/InvalidOfferState.error';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const EMrepo = new MockEmployerRepo();


const offerDTO = new OfferDTO({
  OfferId: randomUUID(),
  State: OfferStatesEnum.Active,
  PublicationDate: new Date(),
  Rating: 0,
  Direction: new LocationDTO({
    latitude: 24,
    longitude: 80, 
  }),
  Sector: Sectors.Laws,
  Budget: 400,
  Description: 'Oferta de prueba',
});



const Orepo = new MockOfferRepo();



function create_Service(repoO: IOfferRepository): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, EMrepo, Msender);
  return service;
}

  
  describe('Eliminar una oferta', () => {

    it('debe tener éxito al suspender una oferta cuando esta activa', async () => {
      await Orepo.save(offerDTO);
      let exampleOffer: OfferDTO = await Orepo.getOfferById(
        offerDTO.OfferId
      );
      let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
      let ExCommand = new EliminatedOfferDTO((await offer)._Id.value);
      let OfferService = create_Service(Orepo);
      await OfferService.Handle(ExCommand);
      let EliminatedOffer: OfferDTO = await Orepo.getOfferById(offer._Id._value);
      expect(
        EliminatedOffer.State.toString() ==
          OfferStatesEnum.Eliminated.toString(),
      );
    });
  
  
  
  it('no debe tener éxito cuando una oferta esta cerrada', async () => {
    await Orepo.save(offerDTO);
    let exampleOffer: OfferDTO = await Orepo.getOfferById(
      offerDTO.OfferId
    );
    let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
    offer._State.state = OfferStatesEnum.Closed;
    Orepo.clear()
    await Orepo.save(EntitiesFactory.fromOfferToOfferDTO(offer))
    let ExCommand = new EliminatedOfferDTO((await offer)._Id.value);
    let OfferService = create_Service(Orepo);
    expect(OfferService.Handle(ExCommand)).rejects.toThrowError(InvalidOfferState);
  });
});

