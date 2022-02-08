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
import { OfferReactivated } from "../../../../../Dominio/DomainEvents/OfferEvents/OfferReactivated";
import {ReactivateOfferDTO} from "../../../../DTO/Offer/ReactivateOfferDTO";
import { InMemoryCandidateCommandRepository } from "src/Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { MockSenderAdapter } from "src/Infrastructure/Memory/MorckSenderAdapter";
import { MockEmployerRepo } from '../../../../../Infrastructure/Memory/MockEmployerRepo.repo';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { LocationDTO } from 'src/Application/DTO/Location.dto';
import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';
import { InvalidOfferState } from 'src/Dominio/AggRoots/Offer/Errors/InvalidOfferState.error';


const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();
const EMrepo = new MockEmployerRepo();


const exampleOfferDto = new OfferDTO({
  OfferId: randomUUID(),
  State: OfferStatesEnum.Active,
  PublicationDate: new Date(),
  Rating: 0,
  Direction: new LocationDTO({
    longitude: 90,
    latitude: 90,
  }),
  Sector: Sectors.Laws,
  Budget: 400,
  Description: 'Oferta de prueba',

})

const Orepo = new MockOfferRepo();


function create_Service(repoO: IOfferRepository): OfferApplicationService {
  const service = new OfferApplicationService(repoO, MCandidateRepo, EMrepo, Msender);
  return service;
}

describe('Reactivar una oferta', () => {
  it('debe tener éxito al reactivar una oferta cuando esta suspendida', async () => {
    await Orepo.save(exampleOfferDto);
    let exampleOffer: OfferDTO = await Orepo.getOfferById(
      exampleOfferDto.OfferId,
    );
    let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
    console.log(Orepo.Offers)
    offer.SuspendOffer(true);
    Orepo.clear()
    await Orepo.save(EntitiesFactory.fromOfferToOfferDTO(offer));
    console.log(offer)
    console.log(Orepo.Offers)
    let ExCommand = new ReactivateOfferDTO((await offer)._Id.value);
    let OfferService = create_Service(Orepo); // comment jose: estas creando instancias del servicio en cada test, crealo por fuera y usalo es mejor
    await OfferService.Handle(ExCommand);
    let oferReactived: Offer = EntitiesFactory.fromOfferDTOtoOffer(
      await Orepo.getOfferById(
        offer._Id.value
        )
        );
    expect(
      () =>
        oferReactived._State.state.toString() ==
        OfferStatesEnum.Active.toString(),
    );
  });
  // it('no debe tener éxito cuando una oferta no esta suspendida', async () => {
  //   await Orepo.save(exampleOfferDto);
  //   let exampleOffer: OfferDTO = await Orepo.getOfferById(
  //     exampleOfferDto.OfferId,
  //   );
  //   let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
  //   let ExCommand = new ReactivateOfferDTO((await offer)._Id.value);
  //   let OfferService = create_Service(Orepo);
  //   expect(OfferService.Handle(ExCommand)).rejects.toThrowError(InvalidOfferState);
  // });
  // it('no debe tener éxito cuando una oferta esta eliminada', async () => {
  //   await Orepo.save(exampleOfferDto);
  //   let exampleOffer: OfferDTO = await Orepo.getOfferById(
  //     exampleOfferDto.OfferId,
  //   );
  //   let offer = EntitiesFactory.fromOfferDTOtoOffer(exampleOffer);
  //   offer.EliminateOffer();
  //   let ExCommand = new ReactivateOfferDTO((await offer)._Id.value);
  //   let OfferService = create_Service(Orepo);

 
  //   expect(OfferService.Handle(ExComman.resolve.d))toThrowError(InvalidOfferState);
  // });
});
