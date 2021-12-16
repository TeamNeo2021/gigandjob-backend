class EmployerLocationVO {

    private readonly value_employer_location: String;

    constructor(value_employer_location:String) {
        if(value_employer_location=" "){
            throw new Error("ERROR: La localización está vacía");
        }
        this.value_employer_location=value_employer_location;
    }
}