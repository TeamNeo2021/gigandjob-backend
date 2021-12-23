import { InvalidEmployerPhone } from "../Errors/InvalidEmployerPhone.error";

export class EmployerPhoneVO {

    value_employer_phone :String;

    constructor(value: String) {
        
        if(!value || value.trim() == ""){
            throw InvalidEmployerPhone.EmptyPhone();
        }
        if(value[0]!="+"){
            throw InvalidEmployerPhone.InvalidFormatPhone();
        }
        if(value.length-1 > 15){
            throw InvalidEmployerPhone.TooBigPhone();
        }

        this.value_employer_phone=value;
    }
}