class Employer extends AggregateRoot implements IInternalEventHandler{
    private Name:String;
    private Description:String;
    private Location:String;
    private Rif:String;
    private Phone:String;
    private Mail:String;
    private ComDesignation:String;
    constructor(parameters) {
       super(); 
    }
    protected When(event: object): void {
        switch(event){
            case EmployeRegistered:
                //to do (Se necesita implementar los value objects)
                break;
        }
    }
    protected EsureValidState(): void {
        throw new Error("Method not implemented.");
    }

    public RegistrarEmpleado(Name:String,
        Description:String,
        Location:String,
        Rif:String,
        Phone:String,
        Mail:String,
        ComDesignation:String){
        this.Apply(new EmployeRegistered(
            Name,
            Description,
            Location,
            Rif,
            Phone,
            Mail,
            ComDesignation
        ));
    }
}