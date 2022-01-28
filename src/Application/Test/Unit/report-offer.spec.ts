import { randomUUID } from 'crypto';
import { OfferService } from 'src/Application/ApplicationServices/OfferService.service';
import { ReportOfferDTO } from 'src/Application/DTO/Offer/ReportOffer.dto';
import { InvalidOfferReportError } from 'src/Dominio/AggRoots/Offer/Errors/InvalidOfferReport.error';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';
import { BudgetVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO';
import { DescriptionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO';
import { DirectionVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO';
import { OfferIdVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO';
import { PublicationDateVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO';
import { RatingVO } from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO';
import {
  Sectors,
  SectorVO,
} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo';
import {
  OfferStatesEnum,
  OfferStateVO,
} from 'src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVo';
import { MockOfferRepo } from 'src/Infrastructure/Memory/MockOfferRepo.repo';
import { InMemoryCandidateCommandRepository } from '../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo';
import { MockSenderAdapter } from '../../../Infrastructure/Memory/MorckSenderAdapter';

const MCandidateRepo = new InMemoryCandidateCommandRepository();
const Msender = new MockSenderAdapter();

describe('Report Offer', () => {
  const mockOffer = () =>
    new Offer(
      new OfferIdVO(),
      new OfferStateVO(OfferStatesEnum.Active),
      PublicationDateVO.Create(new Date(2022, 1, 27)),
      RatingVO.Create(5),
      DirectionVO.Create('Caracas Caricuao'),
      new SectorVO(Sectors.Laws),
      BudgetVO.Create(1000),
      DescriptionVO.Create('This is a laws offer'),
    );

  it('should report offer multiple times', async () => {
    const offer = mockOffer(),
      loadFn = jest.fn().mockReturnValue(Promise.resolve(offer)),
      saveFn = jest.fn(),
      applicationService = new OfferService(
        {
          load: loadFn,
          save: saveFn,
          exists: jest.fn(),
          likeOffer: jest.fn(),
        },
        MCandidateRepo,
        Msender,
      );
    await applicationService.Handle(
      new ReportOfferDTO(offer._Id._value, 'No me gusta', randomUUID()),
    );
    await applicationService.Handle(
      new ReportOfferDTO(offer._Id._value, 'No me gusta', randomUUID()),
    );
    expect(loadFn).toHaveBeenCalled();
    expect(saveFn).toHaveBeenCalled();
    expect(loadFn).toHaveBeenCalledWith(new OfferIdVO(offer._Id.value));
    expect(saveFn.mock.calls[0][0].reports).toHaveLength(2);
  });

  it('should not report offer when it has been reported by the same user', async () => {
    const offer = mockOffer(),
      loadFn = jest.fn().mockReturnValue(Promise.resolve(offer)),
      saveFn = jest.fn(),
      applicationService = new OfferService(
        {
          load: loadFn,
          save: saveFn,
          exists: jest.fn(),
          likeOffer: jest.fn(),
        },
        MCandidateRepo,
        Msender,
      ),
      id = randomUUID();

    await applicationService.Handle(
      new ReportOfferDTO(offer._Id._value, 'No me gusta', id),
    );
    expect(
      applicationService.Handle(
        new ReportOfferDTO(offer._Id._value, 'No me gusta', id),
      ),
    ).rejects.toThrowError(InvalidOfferReportError);
  });
});
