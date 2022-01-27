import { Test, TestingModule } from '@nestjs/testing';
import { OfferApi } from '../Controllers/Offer/offer.controller';

describe('OfferApi', () => {
  let controller: OfferApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferApi],
    }).compile();

    controller = module.get<OfferApi>(OfferApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
