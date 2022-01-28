import { InvalidEmployerPhone } from "../Errors/InvalidEmployerPhone.error";

export class EmployerPhoneVO {

    value_employer_phone :String;

    private constructor(value: String) {
        this.value_employer_phone=value;
    }

    static Create(value: string) {
        if(!value || value.trim() == ""){
            throw InvalidEmployerPhone.EmptyPhone();
        }
        if(value[0]!="+"){
            throw InvalidEmployerPhone.InvalidFormatPhone();
        }
        if(value.length-1 > 15){
            throw InvalidEmployerPhone.TooBigPhone();
        }

        return new EmployerPhoneVO(value)
    }

    static Unsafe(value: string) {
        return new EmployerPhoneVO(value)
    }
}