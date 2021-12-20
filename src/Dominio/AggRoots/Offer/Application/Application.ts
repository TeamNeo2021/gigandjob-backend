import { Entity } from "src/Dominio/Core/Entity";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "src/Dominio/DomainEvents/IDomainEventHandler";
import { CandidateIdVo } from "../../Candidate/ValueObjects/CandidateIdVo";
import { ApplicationBudget } from "./Value Objects/ApplicationBudget";
import { ApplicationDescription } from "./Value Objects/ApplicationDescription";
import { ApplicationId } from "./Value Objects/ApplicationId";
import { ApplicationState, ApplicationStates } from "./Value Objects/ApplicationStates";
import { ApplicationTime } from "./Value Objects/ApplicationTime";

export class Application extends Entity<ApplicationId>{
    private id: ApplicationId;
    private candidateId: CandidateIdVo;
    private state: ApplicationState;
    private previous_state: ApplicationState;
    private budget: ApplicationBudget;
    private description: ApplicationDescription;
    private time: ApplicationTime;
    

    constructor(applier: any) {
        super(applier); 
     }

     protected when(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler.handle(event, this);
     }
     protected EnsureValidState(): void {
        let valid =
            this.id != null &&
            this.budget != null &&
            this.description != null &&
            this.time != null;
            switch (this.state.current) {
                case ApplicationStates.Active: 
                    if (this.previous_state.current == ApplicationStates.Inactive){
                        throw new Error("Invalid change of application state");
                    }
                    break;
                case ApplicationStates.Inactive: 
                    if (this.previous_state.current == ApplicationStates.Inactive){
                        throw new Error("Invalid change of application state");
                    }
                    break;
                default:
                    break;
            };

        if (!valid){
            throw new Error("Invalid state for application");
        }
        
     }

    public getState():ApplicationStates{
        return this.state.current;
    }

    public set setState(_state: ApplicationStates){
        this.state.current = _state;
    }

    public getPreviousState():ApplicationStates{
        return this.previous_state.current;
    }

    public getCandidateId(): CandidateIdVo{
        return this.candidateId;

    }

    public get getBudget(): ApplicationBudget{
        return this.budget;
    }
}