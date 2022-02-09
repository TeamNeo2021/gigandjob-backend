import { InvalidOfferRating } from '../../AggRoots/Offer/Errors/InvalidOfferRating.error';
import { RatingVO } from '../../AggRoots/Offer/ValueObjects/OfferRatingVO';

describe('Rating', () => {
  //Validemos nuestra rating
  it('Deberia fallar si el rating es nulo', () => {
    //Validate que no es vacia
    expect(() => RatingVO.Create(null)).toThrowError(InvalidOfferRating);
  }),
    it('Deberia fallar si el rating es menor a 0', () => {
      //Validate que no es negativa
      expect(() => RatingVO.Create(-41)).toThrowError(InvalidOfferRating);
    });

  it('Deberia crear cuando le pase un numero', () => {
    expect(RatingVO.Create(5)).toBeInstanceOf(RatingVO);
  });
});
