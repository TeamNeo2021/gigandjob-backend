import { Cv as CV } from "../../Dominio/AggRoots/CV/cv.root";

export interface ICVCommandRepository{

    save(cv: CV): Promise<CV>;

    modify(id: string, cv: CV): Promise<CV>;

    eliminate(id: string): Promise<void>;

}