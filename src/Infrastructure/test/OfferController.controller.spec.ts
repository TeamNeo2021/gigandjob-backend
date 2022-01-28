import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from '../Controllers/Offer/OfferController.controller';



describe('OfferApi', () => {
  let controller: OfferController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [OfferController],
  //   }).compile();

  //   controller = module.get<OfferController>(OfferController);
  // });

  it('should be defined', () => {
    //expect(controller).toBeDefined();
  });

  //TODO: This has to be implemented when the concrete repository is done
  // it('should ', () => {
  //   expect(
  //     exampleOfferApi.createOffer('fake direction','fake sector',10,'fake desc')
  //   ).toEqual('Offer has been created')
    
  // });
});
