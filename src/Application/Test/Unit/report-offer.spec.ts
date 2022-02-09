import { randomUUID } from 'crypto';
import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';
import { LocationDTO } from 'src/Application/DTO/Location.dto';
import { OfferDTO } from 'src/Application/DTO/Offer/OfferDTO';
import { OfferApplicationService } from '../../../Application/ApplicationServices/Offer/OfferApplicationService.service';
import { ReportOfferDTO } from '../../../Application/DTO/Offer/ReportOffer.dto';
import { InvalidOfferReportError } from '../../../Dominio/AggRoots/Offer/Errors/InvalidOfferReport.error';
import { Offer } from '../../../Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { OfferLocationVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { OfferIdVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { PublicationDateVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import {
  Sectors,
  SectorVO,
} from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import {
  OfferStatesEnum,
  OfferStateVO,
} from '../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';

describe('Report Offer', () => {
  // const mockOffer = () =>
  //   new Offer(
  //     new OfferIdVO(),
  //     new OfferStateVO(OfferStatesEnum.Active),
  //     PublicationDateVO.Create(new Date(2022, 1, 27)),
  //     RatingVO.Create(5),
  //     new OfferLocationVO(10,100),
  //     new SectorVO(Sectors.Laws),
  //     BudgetVO.Create(1000),
  //     DescriptionVO.Create('This is a laws offer'),
  //   );
  const s = OfferStatesEnum[OfferStatesEnum.Active];

  const mockOffer = () =>
    new OfferDTO({
      OfferId: randomUUID(),
      State: OfferStatesEnum.Active,
      PublicationDate: new Date(2022, 1, 27),
      Rating: 5,
      Direction: new LocationDTO({
        latitude: 10,
        longitude: 100,
      }),
      Sector: Sectors.Laws,
      Budget: 1000,
      Description: 'This is a laws offer',
      reports: [],
      applications: [],
    });

  it('should report offer multiple times', async () => {
    let offer = mockOffer();
    const loadFn = jest.fn().mockImplementation((_) => offer),
      saveFn = jest.fn().mockImplementation((of) => {
        offer = of;
      }),
      applicationService = new OfferApplicationService(
        {
          getOfferById: loadFn,
          save: saveFn,
          exists: jest.fn(),
          likeOffer: jest.fn(),
          getAll: jest.fn(),
        },
        {
          getAll: jest.fn(),
          save: jest.fn(),
          modify: jest.fn(),
          suspend: jest.fn(),
          getOne: jest.fn(),
          eliminate: jest.fn(),
          reactive: jest.fn(),
        },
        {
          save: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
          eliminate: jest.fn(),
        },
        {
          send: jest.fn(),
        },
      );
    await applicationService.Handle(
      new ReportOfferDTO(offer.OfferId, 'No me gusta 1', randomUUID()),
    );
    await applicationService.Handle(
      new ReportOfferDTO(offer.OfferId, 'No me gusta 2', randomUUID()),
    );
    expect(loadFn).toHaveBeenCalled();
    expect(saveFn).toHaveBeenCalled();
    expect(loadFn).toHaveBeenCalledWith(offer.OfferId);
    expect(offer.reports).toHaveLength(2);
  });

  it('should not report offer when it has been reported by the same user', async () => {
    let offer = mockOffer();
    const loadFn = jest.fn().mockImplementation((_) => offer),
      saveFn = jest.fn().mockImplementation((of) => (offer = of)),
      applicationService = new OfferApplicationService(
        {
          getOfferById: loadFn,
          save: saveFn,
          exists: jest.fn(),
          likeOffer: jest.fn(),
          getAll: jest.fn(),
        },
        {
          getAll: jest.fn(),
          save: jest.fn(),
          modify: jest.fn(),
          suspend: jest.fn(),
          getOne: jest.fn(),
          eliminate: jest.fn(),
          reactive: jest.fn(),
        },
        {
          save: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
          eliminate: jest.fn(),
        },
        {
          send: jest.fn(),
        },
      ),
      id = randomUUID();

    await applicationService.Handle(
      new ReportOfferDTO(offer.OfferId, 'No me gusta', id),
    );
    expect(
      applicationService.Handle(
        new ReportOfferDTO(offer.OfferId, 'No me gusta', id),
      ),
    ).rejects.toThrowError(InvalidOfferReportError);
  });
});
