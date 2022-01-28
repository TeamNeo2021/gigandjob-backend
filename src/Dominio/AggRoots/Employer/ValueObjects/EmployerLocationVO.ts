import { InvalidEmployerLocation } from "../Errors/InvalidEmployerLocation.error";

export class EmployerLocationVO {

    readonly value_employer_location: String;

    private constructor(value_employer_location:String) {
        this.value_employer_location=value_employer_location;
    }

    static Create(value_employer_location: String) {
        if(!value_employer_location || value_employer_location.trim() == ""){
            throw InvalidEmployerLocation.EmptyLocation();
        }
        return new EmployerLocationVO(value_employer_location)
    }

    static Unsafe(value_employer_location: String) {
        return new EmployerLocationVO(value_employer_location)
    }
}