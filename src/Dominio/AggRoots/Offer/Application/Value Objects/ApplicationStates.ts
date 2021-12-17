export class ApplicationState{
   public current: ApplicationStates

   constructor(){
       this.current = ApplicationStates.Active;
   }
}

export enum ApplicationStates{
    Active,
    Inactive
}