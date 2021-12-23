export class InvalidEmployerLocation extends Error {
  
    static EmptyLocation() {
        return new InvalidEmployerLocation("ERROR: La localización está vacía");
    }
    
}