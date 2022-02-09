import { LocationDTO } from 'src/Application/DTO/Location.dto';
import { createOfferDTO } from '../../../DTO/Offer/CreateOffer.dto';

const exampleDirection: LocationDTO = new LocationDTO({
  latitude: 0,
  longitude: 0,
});
const exampleSector = 'testing sector';
const exampleBudget = 10;
const exampleDescription = 'Lorem ipsum dolor sit amet.';

const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}; // extracted from https://flaviocopes.com/how-to-determine-date-is-today-javascript/

//function to create the DTO`s
function create_Offer_dto(): createOfferDTO {
  return new createOfferDTO({
    Direction: exampleDirection,
    Budget: exampleBudget,
    Sector: exampleSector,
    Description: exampleDescription,
  });
}

describe('CreateOffer DTO', () => {
  it('should succeed when creating a correct instance', () => {
    expect(() => {
      create_Offer_dto();
    }).not.toThrow(Error);
  });
  it('should have `Active` state', () => {
    const actualDTO: createOfferDTO = create_Offer_dto();
    expect(actualDTO.State).toEqual('Active');
  });
  it('should have a 0 rating value', () => {
    const actualDTO: createOfferDTO = create_Offer_dto();
    expect(actualDTO.Rating).toEqual(0);
  });
  it('should have today`s date', () => {
    const actualDTO: createOfferDTO = create_Offer_dto();
    expect(isToday(actualDTO.PublicationDate)).toEqual(true);
  });
});
