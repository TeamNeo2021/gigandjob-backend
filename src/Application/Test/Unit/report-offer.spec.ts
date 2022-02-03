import { randomUUID } from "crypto"
import { OfferApplicationService } from "../../../Application/ApplicationServices/Offer/OfferApplicationService.service"
import { ReportOfferDTO } from "../../../Application/DTO/Offer/ReportOffer.dto"
import { InvalidOfferReportError } from "../../../Dominio/AggRoots/Offer/Errors/InvalidOfferReport.error"
import { Offer } from "../../../Dominio/AggRoots/Offer/Offer"
import { BudgetVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO"
import { DescriptionVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO"
import { OfferLocationVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO"
import { OfferIdVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferIdVO"
import { PublicationDateVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO"
import { RatingVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO"
import { Sectors, SectorVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferSectorVo"
import { OfferStatesEnum, OfferStateVO } from "../../../Dominio/AggRoots/Offer/ValueObjects/OfferStateVo"

describe('Report Offer', () => {
  const mockOffer = () =>
    new Offer(
      new OfferIdVO(),
      new OfferStateVO(OfferStatesEnum.Active),
      PublicationDateVO.Create(new Date(2022, 1, 27)),
      RatingVO.Create(5),
      new OfferLocationVO(10,100),
      new SectorVO(Sectors.Laws),
      BudgetVO.Create(1000),
      DescriptionVO.Create('This is a laws offer'),
    );

    it('should report offer multiple times', async () => {
        const offer = mockOffer(), 
              loadFn = jest.fn().mockReturnValue(Promise.resolve(offer)),
              saveFn = jest.fn(),
              applicationService = new OfferApplicationService({
                  getOfferById: loadFn,
                  save: saveFn,
                  exists: jest.fn(),
                  likeOffer: jest.fn(),
                  getAll: jest.fn()
              }, {
                getAll: jest.fn(),
                save: jest.fn(),
                modify: jest.fn(),
                suspend: jest.fn(),
                getOne: jest.fn(),
                eliminate: jest.fn(),
                reactive: jest.fn()
              }, {        
                save: jest.fn(),            
                get: jest.fn(),
                getAll: jest.fn(),
                eliminate: jest.fn(),                                                
              },
               {
                send: jest.fn()
              })
        await applicationService.Handle(new ReportOfferDTO(offer._Id._value, 'No me gusta', randomUUID()))
        await applicationService.Handle(new ReportOfferDTO(offer._Id._value, 'No me gusta', randomUUID()))
        expect(loadFn).toHaveBeenCalled()
        expect(saveFn).toHaveBeenCalled()
        expect(loadFn).toHaveBeenCalledWith(new OfferIdVO(offer._Id.value))
        expect(saveFn.mock.calls[0][0].reports).toHaveLength(2)
    })

    it('should not report offer when it has been reported by the same user', async () => {
        const offer = mockOffer(), 
              loadFn = jest.fn().mockReturnValue(Promise.resolve(offer)),
              saveFn = jest.fn(),
              applicationService = new OfferApplicationService({
                  getOfferById: loadFn,
                  save: saveFn,
                  exists: jest.fn(),
                  likeOffer: jest.fn(),
                  getAll: jest.fn()
              }, {
                getAll: jest.fn(),
                save: jest.fn(),
                modify: jest.fn(),
                suspend: jest.fn(),
                getOne: jest.fn(),
                eliminate: jest.fn(),
                reactive: jest.fn()
              }, {        
                save: jest.fn(),            
                get: jest.fn(),
                getAll: jest.fn(),
                eliminate: jest.fn(),                                                
              }, {
                send: jest.fn()
              }),
              id = randomUUID()

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
