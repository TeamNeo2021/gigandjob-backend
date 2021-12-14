class Employer extends AggregateRoot implements IInternalEventHandler{
    
    //El constructor representa al metodo "Registrar empleador"
    constructor(parameters) {
       super(); 
    }
    protected When(event: object): void {
        throw new Error("Method not implemented.");
    }
    protected EsureValidState(): void {
        throw new Error("Method not implemented.");
    }

    public RegistrarEmpleado(){
        this.Apply();
    }
}