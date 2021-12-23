export class InvalidOfferId extends Error {
  
    static EmptyId() {
        return new InvalidOfferId("ERROR: El id está vacío");
    }

    static InvalidFormatId(id:string) {
        return new InvalidOfferId(`ERROR: El formato del id es invalido  (id: ${id})`);
    }
}