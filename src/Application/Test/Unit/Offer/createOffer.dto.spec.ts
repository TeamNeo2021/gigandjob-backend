import { createOfferDTO } from "../../../DTO/Offer/CreateOffer.dto";

const exampleDirection:string = 'testing direction';
const exampleSector:string = 'testing sector';
const exampleBudget:number = 10;
const exampleDescription:string = 'Lorem ipsum dolor sit amet.'

const isToday = (someDate:Date) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}// extracted from https://flaviocopes.com/how-to-determine-date-is-today-javascript/


//function to create the DTO`s
function create_Offer_dto():createOfferDTO{
    return new createOfferDTO(
        exampleDirection,
        exampleSector,
        exampleBudget,
        exampleDescription
    );
}

describe('CreateOffer DTO', () => {
    it('should succeed when creating a correct instance', () => {
        expect(()=>{
            create_Offer_dto();
        }).not.toThrow(Error);
    });
    it('should have `Active` state', () => {
        let actualDTO: createOfferDTO = create_Offer_dto();
        expect(actualDTO.State).toEqual('Active');
    });
    it('should have a 0 rating value', () => {
        let actualDTO: createOfferDTO = create_Offer_dto();
        expect(actualDTO.Rating).toEqual(0);
    });
    it('should have today`s date', () => {
        let actualDTO: createOfferDTO = create_Offer_dto();
        expect(isToday(actualDTO.PublicationDate)).toEqual(true);
    });
});