export class EmployerDescriptionVO {
    
    private readonly value_employer_description: String;
    
    constructor(value_employer_description:String) {
        if(value_employer_description===' '){
            throw new Error("ERROR: La descripcion esta vacia");
        }
        if(value_employer_description.length>500){
            throw new Error("ERROR: La descripcion no puede tener mas de 500 caracteres");
        }
        this.value_employer_description=value_employer_description;
    }
}