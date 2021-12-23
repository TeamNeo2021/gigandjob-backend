export class InvalidOfferDirection extends Error {
  
    static EmptyDirection() {
        return new InvalidOfferDirection("ERROR: La dirección está vacía")
    }
    
}