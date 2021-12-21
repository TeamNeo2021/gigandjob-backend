import { IInternalEventHandler } from "../AggRoots/IInternalEventHandler";

export abstract class Entity<TId> implements IInternalEventHandler{

   
    protected readonly _guid: TId;
    //private readonly  _applier : Action<object>;
    private readonly  _applier : any;

    public get guid(): TId {
        return this._guid;
    }


    constructor(applier: any){
        this._applier = applier;
    }

    protected abstract when(event: any);
    
    protected apply(event:any){
        this.when(event);
        this._applier(event);
    }

    Handle(event: any): void {
        this.when(event);
    }

    
}

