import { IDomainEvent } from './IDomainEvent'

export class EmployerRegistered implements IDomainEvent {
    dateTimeOcurred: Date;

    Name:String;
    Description:String;
    Location:String;
    Rif:String;
    Phone:String;
    Mail:String;
    ComDesignation:String;

    constructor(Name:String,
        Description:String,
        Location:String,
        Rif:String,
        Phone:String,
        Mail:String,
        ComDesignation:String) {        
            this.Name = Name;
            this.Description=Description;
            this.Location=Location;
            this.Rif=Rif;
            this.Phone=Phone;
            this.Mail=Mail;
            this.ComDesignation=ComDesignation;   
    }
}