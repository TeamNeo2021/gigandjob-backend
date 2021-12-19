export class PublicationDateVO{

    private readonly value:Date;

    constructor(value:Date){
        if(value===null){
            throw new Error("Error: La fecha esta vacia ");
        }
        this.value=value;
    }    
}