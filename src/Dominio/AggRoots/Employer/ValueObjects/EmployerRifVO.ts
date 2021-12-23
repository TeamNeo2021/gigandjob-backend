import { InvalidEmployerRif } from "../Errors/InvalidEmployerRif.error";

export class EmployerRifVO {

    private readonly value_employer_rif:String;

    constructor(value_employer_rif:String) {
        
        if(!value_employer_rif || value_employer_rif.trim() == ""){
            throw InvalidEmployerRif.EmptyRif();
        }
        if(value_employer_rif[0]!="J" && value_employer_rif[1]!="-"){
            throw InvalidEmployerRif.InvalidFormatRif();
        }
        if(value_employer_rif.length-2>9){
            throw InvalidEmployerRif.TooBigRif();
        }

        this.value_employer_rif=value_employer_rif;
    }
}