export class ApplicationBudget{
    public value: number;

    constructor(v:number){
        if (v == null){
            throw new TypeError('Application Budget cannot be empty');            
        }
        if (v <= 0){
            throw new RangeError('Application Budget cannot be less than 0');            
        }
        this.value = Number(Math.round(v).toFixed(2));
    }
}