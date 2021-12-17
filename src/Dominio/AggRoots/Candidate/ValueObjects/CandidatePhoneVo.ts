import { InvalidCandidatePhoneNumber } from "./Errors/invalidCandidatePhoneNumber.error";

export class CandidatePhoneVo{
    private _phone: String;

    constructor(phone:String){
        if (this.phoneValidate(phone)){
            this._phone = phone;
        }
    }

    get phoneNumber(): String{
        return this._phone;
    }

    //chamo te falta validar el numero de caracteres que puede tener ese numero de telefono ---Moncada

    protected phoneValidate(phone: String): boolean{
       if (phone === null || phone === '' || phone === undefined){
            throw  InvalidCandidatePhoneNumber.emptyPhoneNumber();
       } 
       if (isNaN(Number(phone))){
        throw  InvalidCandidatePhoneNumber.invalidPhoneNumber();
       }else{
           return true;      
       }
    }
}