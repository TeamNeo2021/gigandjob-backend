export class InvalidEmployerComercialDesignation extends Error {
  
    static EmptyComercialDesignation() {
        return new InvalidEmployerComercialDesignation("ERROR: la denominación comercial está vacía")
    }

    static TooBigComercialDesignation() {
        return new InvalidEmployerComercialDesignation("ERROR: La denominación comercial no debe ser mayor a 100 caracteres")
    }
}