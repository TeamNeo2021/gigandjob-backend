import { Cv } from '../AggRoots/CV/cv.root';
import { IDomainEvent } from './IDomainEvent';

export class CvAspirantApproved  implements IDomainEvent {
    public dateTimeOcurred: Date;

   // public CvAspirantApproved:String;
 
    public CvAspirantApproved:Cv;
 
    constructor(CvAspirant:Cv) {//Cambiar String por Cv cuando este hecho
        this.dateTimeOcurred = new Date(Date.now());
        //this.CvAspirantApproved=CvAspirant.approve();//Cambiar por:CvAspirant=this.CvAspirant.approved();
    }
}