import { InvalidEmployerDescription } from "../Errors/InvalidEmployerDescription.error";

export class EmployerDescriptionVO {
    
    public readonly value_employer_description: String;
    
    private constructor(value: string) {
        this.value_employer_description = value
    }

    static Create(value_employer_description: string) {
        if(!value_employer_description || value_employer_description.trim() == ""){
            throw InvalidEmployerDescription.EmptyDescription();
        }
        if(value_employer_description.length>500){
            throw InvalidEmployerDescription.TooBigDescription();
        }
        return new EmployerDescriptionVO(value_employer_description)
    }

    static Unsafe(value_employer_description: string) {
        return new EmployerDescriptionVO(value_employer_description)
    }
}