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

    protected phoneValidate(phone: String): boolean{
       if (phone === null || phone === '' || phone === undefined){
            throw new Error('Debe colocar un numero telefonico');
       } 
       if (isNaN(Number(phone))){
            throw new Error('Solo se admiten numeros');
       }else{
           return true;      
       }
    }
}