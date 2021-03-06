import { EmptyCandidateName } from "./Errors/emptyCandidateName.error";
import { CandidateNameValidator } from "./Validations/CandidateNameValidator";

export class CandidateFullNameVo {

    private _names: String;
    
    private _lastNames: String;

    constructor(
        names: String,
         lastNames: String,
       //  private validator: CandidateNameValidator //implementacion de patron decorador @deprecated
         
         ) { 
        if(this.checkNull(names) && this.checkNull(lastNames)){
            this._names = names;
            this._lastNames = lastNames;
        }else{
            throw new Error('Names invalid');
        }
        
    }
   
    

    get fullName(): String {
        return this.names + ' ' + this.lastNames;
    }

    public get names(): String {
        return this._names;
    }
    public set names(value: String) {
        this._names = value;
    }

    public get lastNames(): String {
        return this._lastNames;
    }
    public set lastNames(value: String) {
        this._lastNames = value;
    }

    
    checkNull(name:String){
        if(name == ''){
           throw new EmptyCandidateName();
           console.log('Candidate name cannot be empty');
            return false;
        }else{
            return true
        }

    }

}