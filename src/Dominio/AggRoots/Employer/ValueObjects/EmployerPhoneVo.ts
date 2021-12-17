class EmployerPhoneVo {

    value :String;

    constructor(value: String) {
        
        if(value==''){
            throw new Error('ERROR: El teléfono está vacío');
        }
        if(value[0]!="+"){
            throw new Error('ERROR: El teléfono debe comenzar con el signo +');
        }
        if(value.length-1 > 15){
            throw new Error('ERROR: El teléfono no debe tener mas de 15 digitos');
        }

        this.value=value;
    }
}