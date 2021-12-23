export class InvalidOfferDescription extends Error {
  
    static EmptyDescription() {
        return new InvalidOfferDescription("ERROR: La descripcion está vacía")
    }

    static TooBigDescription() {
        return new InvalidOfferDescription("ERROR: La descripcion no debe ser mayor a 2000 caracteres")
    }
}