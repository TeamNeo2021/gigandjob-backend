import { CandidateApplied } from "../../../DomainEvents/CandidateEvents/CandidateApplied";
import { Entity } from "../../../Core/Entity";
import { CandidateIdVo } from "../../Candidate/ValueObjects/CandidateIdVo";
import { ApplicationBudget } from "./Value Objects/ApplicationBudget";
import { ApplicationDescription } from "./Value Objects/ApplicationDescription";
import { ApplicationId } from "./Value Objects/ApplicationId";
import { ApplicationState, ApplicationStates } from "./Value Objects/ApplicationStates";
import { ApplicationTime } from "./Value Objects/ApplicationTime";


export class Application extends Entity<ApplicationId>{
    private readonly id: ApplicationId;
    private candidateId: CandidateIdVo;
    private state: ApplicationState;
    private previous_state: ApplicationState;
    private budget: ApplicationBudget;
    private description: ApplicationDescription;
    private time: ApplicationTime;
    

    constructor(applier: any,
        id:ApplicationId, 
        candidateId:CandidateIdVo,
        state: ApplicationState,
        budget: ApplicationBudget,
        description: ApplicationDescription,
        time: ApplicationTime) 
    {
        
        super(applier); 
        this.id = id;
        this.candidateId = candidateId;
        this.state = state;
        this.budget = budget;
        this.description = description; 
        this.time = time;
    }

     protected when(event: any): void {
       switch (event.constructor) {
           case CandidateApplied:
               console.log('application '
                           + this.id 
                           + ' created from candidate '
                           +event.candidateId)   
               break;
       
           default:
               break;
       }
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
    public setState(state: ApplicationStates){
         this.state.current = state;
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

    public getTime(): ApplicationTime{
        return this.time;
    }
}