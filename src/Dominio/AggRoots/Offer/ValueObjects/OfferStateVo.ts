export class OfferStateVO{
    state: OfferStatesEnum;    

    constructor(currentState: OfferStatesEnum){
        this.state = currentState;        
    }
}

export enum OfferStatesEnum{
    Active,
    Suspended,
    Closed,
}