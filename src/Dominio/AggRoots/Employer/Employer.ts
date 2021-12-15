
import { EmployerRegistered } from 'src/Dominio/DomainEvents/EmployerRegistered';
import { EmployerRegisteredHandler } from 'src/Dominio/DomainEvents/EmployerRegisteredHandler';
import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { AggregateRoot } from '../AggregateRoot'
import { IInternalEventHandler } from '../IInternalEventHandler';


export class Employer extends AggregateRoot implements IInternalEventHandler{
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
    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler.handle(event, this);
    }
    protected EnsureValidState(): void {
        console.log("protected")
        throw new Error("Method not implemented.");
    }

    public RegistrarEmpleado(Name:String,
        Description:String,
        Location:String,
        Rif:String,
        Phone:String,
        Mail:String,
        ComDesignation:String){
        this.Apply(new EmployerRegistered(
            Name,
            Description,
            Location,
            Rif,
            Phone,
            Mail,
            ComDesignation
        ), new EmployerRegisteredHandler);
    }
}