import { InvalidEmployerDescription } from "../Errors/InvalidEmployerDescription.error";

export class EmployerDescriptionVO {
    
    private readonly value_employer_description: String;
    
    constructor(value_employer_description:String) {
        if(!value_employer_description || value_employer_description.trim() == ""){
            throw InvalidEmployerDescription.EmptyDescription();
        }
        if(value_employer_description.length>500){
            throw InvalidEmployerDescription.TooBigDescription();
        }
        this.value_employer_description=value_employer_description;
    }
}