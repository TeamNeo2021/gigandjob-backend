export class ApplicationState{
   current: ApplicationStates

   constructor(){
       this.current = ApplicationStates.Active;
   }
}

export enum ApplicationStates{
    Active,
    Inactive
}