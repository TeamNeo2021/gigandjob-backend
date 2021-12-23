export class InvalidEmployerMail extends Error {
  
    static EmptyMail() {
        return new InvalidEmployerMail("ERROR: El email está vacío");
    }

    static InvalidFormatMail() {
        return new InvalidEmployerMail("ERROR: El formato del email es invalido");
    }
}