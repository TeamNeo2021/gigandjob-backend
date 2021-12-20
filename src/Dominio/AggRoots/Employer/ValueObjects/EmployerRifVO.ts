export class EmployerRifVO {

    private readonly value_employer_rif:String;

    constructor(value_employer_rif:String) {
        
        if(value_employer_rif===" "){
            throw new Error('ERROR: El rif está vacío');
        }
        if(value_employer_rif[0]!="J" && value_employer_rif[1]!="-"){
            throw new Error('ERROR: El rif debe comenzar con J-');
        }
        if(value_employer_rif.length-2>9){
            throw new Error('ERROR: El rif no debe tener mas de 9 digitos');
        }

        this.value_employer_rif=value_employer_rif;
    }
}