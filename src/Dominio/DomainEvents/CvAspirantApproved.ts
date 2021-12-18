import { IDomainEvent } from './IDomainEvent';

export class CvAspirantApproved  implements IDomainEvent {
    public dateTimeOcurred: Date;

    public CvAspirantApproved:String;
    //Cambiar por :
    /*
    public CvAspirantApproved:Cv;
    */
    constructor(CvAspirant:String) {//Cambiar String por Cv cuando este hecho
        this.dateTimeOcurred = new Date(Date.now());
        this.CvAspirantApproved=CvAspirant;//Cambiar por:CvAspirant=this.CvAspirant.approved();
    }
}