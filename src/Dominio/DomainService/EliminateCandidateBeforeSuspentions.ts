import { Candidate } from "../AggRoots/Candidate/Candidate";
import { IObservable } from "../Core/IObservable";
import { IObserver } from "../Core/IObserver";
import { CandidateEliminated } from "../DomainEvents/Candidate/CandidateEliminated";
import { CandidateEliminatedHandler } from "../DomainEvents/Candidate/CandidateEliminatedHandler";
import { CandidateSuspended } from "../DomainEvents/Candidate/CandidateSuspended";

export class EliminateCandidateBeforeSuspentions implements IObserver{
    candidate: Candidate;
    
    constructor(candidate: Candidate){
        this.candidate = candidate;
    }

    public update(): void{
        this.CheckForSuspentions();
    }

    private CheckForSuspentions(): void{

        //This are the events that the candidate holds
        let changes = this.candidate.GetChanges();


        //This are the suspention events, starting empty
        let suspentions = [];


        //Lets check for the typeof the events
        for (let change of changes){
            if (typeof change == typeof CandidateSuspended){
                suspentions.push()
            }
        }

        //If there are more than 3 suspentions, apply the 
        //CandidateEliminated event 
        if (suspentions.length >= 3){
            this.candidate.Apply(new CandidateEliminated(), 
            new CandidateEliminatedHandler())
        }
    }
}