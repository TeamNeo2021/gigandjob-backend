export class ApplicationId{
    private readonly value: string;

    constructor(v:string){
        if (v == null){
            throw new TypeError('Application ID cannot be empty');            
        }
        this.value=v;
    }
}