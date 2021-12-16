import { IAction } from "./IAction";


export class Decorator extends IAction{ 
// Se aplica patron decorador e inyeccion de dependencias

    constructor(
       private validatorWrappee: IAction
    ){ 
        super();
    }

    execute(object:any):any{ // en teoria esto deberia retornar un IAction pero no me cuadra
        return this.validatorWrappee.execute(object);
    }
}
