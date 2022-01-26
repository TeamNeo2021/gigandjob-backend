import { Cv as CV } from "../../Dominio/AggRoots/CV/cv.root";

export interface ICVCommandRepository{

    save(cv: CV): CV;

    modify(id: string, cv: CV): CV;

    eliminate(id: string): void;

}