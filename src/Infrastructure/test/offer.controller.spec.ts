import { Test, TestingModule } from '@nestjs/testing';
import { OfferApi } from '../API/Offer/offer.controller';

const exampleOfferApi: OfferApi = new OfferApi();
const mockedRequest:any = {
    body:{
      "direction": "fake Dir",
      "sector:": "fake Sector",
      "budget": 10,
      "description": "fake desc"
    }
}

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

  //TODO: This has to be implemented when the concrete repository is done
  // it('should ', () => {
  //   expect(
  //     exampleOfferApi.createOffer('fake direction','fake sector',10,'fake desc')
  //   ).toEqual('Offer has been created')
    
  // });
});
