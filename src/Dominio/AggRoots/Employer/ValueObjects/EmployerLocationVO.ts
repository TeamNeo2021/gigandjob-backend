import { InvalidEmployerLocation } from "../Errors/InvalidEmployerLocation.error";

export class EmployerLocationVO {

    private readonly value_employer_location: String;

    constructor(value_employer_location:String) {
        if(!value_employer_location || value_employer_location.trim() == ""){
            throw InvalidEmployerLocation.EmptyLocation();
        }
        this.value_employer_location=value_employer_location;
    }
}