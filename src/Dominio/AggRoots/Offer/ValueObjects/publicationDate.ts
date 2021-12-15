class publicationDate{

    private readonly day:String;
    private readonly month:String;
    private readonly year:String;

    constructor(Day:String,Month:String,Year:String ){
        if((Day ==" ")||(Month== " ")||(Year== " ")){
            throw new Error("Error: Dia, Mes o año estan vacios ");
            
        }
        this.day=Day;
        this.month=Month;
        this.year=Year;
    }    
}