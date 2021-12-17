import { Decorator } from "src/Dominio/Core/Decorator";
import { IAction } from "src/Dominio/Core/IAction";

//aqui estaba intentando implementar patron decorador pero me volvi un qlo continuo luego

export class CandidateNameValidator extends Decorator { 

    execute(string){
       super.execute(string);
       let result = this.checkNull(string);
       return result;
       
    }

    checkNull(name:String){
        if(name == ''){
           // throw new Error('Candidate name cannot be empty');
           console.log('Candidate name cannot be empty');
            return false;
        }else{
            return true
        }

    }

}
    


// let name = new CandidateFullNameVo('Jose', 'Moncada');
// let validator = new CandidateNameNotNullValidator().execute();
// validator.execute('x vaina'); -->lanza un error o devuelve que es correcto algo asi