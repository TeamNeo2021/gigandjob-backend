export class createOfferDTO {
    State: string;
    PublicationDate: Date;
    Rating: number;
    Direction: string;
    Sector: string;
    Budget: number;
    Description: string;
    
    constructor(Direction: string, 
                Sector: string, 
                Budget: number, 
                Description: string){
        
        this.State = 'Active'
        this.PublicationDate = new Date();
        this.Rating = 0;
        this.Direction = Direction;
        this.Sector = Sector;
        this.Budget = Budget;
        this.Description = Description;
    }
}