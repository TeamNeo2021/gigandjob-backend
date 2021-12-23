import { Candidate } from "../AggRoots/Candidate/Candidate";
import { Offer } from "../AggRoots/Offer/Offer";

/*this domain service is in charge of calling 
the corresponding AggRoots Offer and Candidate methods.*/

export class ApplyToOffer{

    //these parameters are necessary to call the methods
    private readonly candidate: Candidate;
    private readonly offer: Offer;
    private budget: number;
    private description: string;
    private time: number;
    //TODO: parameters for candidate method missing

    constructor(
        candidate: Candidate,
        offer: Offer,
        budget: number,
        description: string,
        time: number
    ){
        this.candidate = candidate;
        this.offer = offer;
        this.budget = budget;
        this.description = description;
        this.time = time;
    }

    //Here we call the methods
    public createApplication(): void{

        //First, we call the offer method
        this.offer.createApplication(
            this.candidate.Id.value,
            this.budget,
            this.description,
            this.time
        )

        //TODO: call to candidate method missing
    };
}