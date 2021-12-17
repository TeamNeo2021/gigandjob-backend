export class ApplicationTime{
    public days: number;

    constructor(d:number){
        if (d == null){
            throw new TypeError('Application Time cannot be empty');            
        }
        if (d <= 0){
            throw new RangeError('Application Time cannot be negative');            
        }
        if (d == 0){
            throw new RangeError('Application Time cannot be zero');            
        }
        this.days=d;
    }
}