import { Cv as CV } from '../../Dominio/AggRoots/CV/cv.root';

export interface ICVCommandRepository {
  save(cv: CV): Promise<void>;

  /**
   * It is used for the Domain Events: Approved, Rejected and other...
   * @param id
   * @param cv
   */
  change(id: string, cv: CV): Promise<void>;

  getOne(id: string): Promise<CV>;
  getAll(): Promise<CV[]>;
}
