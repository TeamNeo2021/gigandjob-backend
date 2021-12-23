export class InvalidEmployerRif extends Error {
  
    static EmptyRif() {
        return new InvalidEmployerRif("ERROR: El rif está vacío");
    }

    static InvalidFormatRif() {
        return new InvalidEmployerRif("ERROR: El rif debe comenzar con J-");
    }

    static TooBigRif() {
        return new InvalidEmployerRif("ERROR: El rif no debe tener mas de 9 digitos");
    }
}