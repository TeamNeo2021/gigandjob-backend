import { Candidate } from "../AggRoots/Candidate/Candidate";
import { IObserver } from "../Core/IObserver";
import { CandidateStateModified } from "../DomainEvents/CandidateEvents/CandidateStateModified";



export class EliminateCandidateBeforeSuspentions implements IObserver{
    private readonly candidate: Candidate;

    //Number of times it can be suspended before elimination
    private suspentionTolerance: number = 3;

    constructor(candidate: Candidate){
        this.candidate = candidate;
    }

    public update(): void{
        
        this.CheckForSuspentions();
    }

    private CheckForSuspentions(): void{

        //This are the events that the candidate holds
        const changes = this.candidate.GetChanges();

       //last event 
        const last_change = changes[changes.length-1]

        
        //If it is not Candidate Suspended Event, then ignore
        if (!(last_change instanceof CandidateStateModified) 
            || !(last_change.new_current == 'Suspended')){
            return;
        }
        //This are the suspention events, starting empty
        let suspentions = [];

        
        //Lets check for the class of the events
        for (let change of changes){
            if (change instanceof CandidateStateModified &&
                change.new_current == 'Suspended'){
                suspentions.push(change)
            }
        }
      
        //If there are more than 3 suspentions, apply the 
        //CandidateEliminated event 
        if (suspentions.length >= this.suspentionTolerance){
            
            this.candidate.eliminateThisCandidate();
        }
    }
}