import { resolve } from 'path/posix';
import { ICVCommandRepository } from '../../Application/Repositories/CVRepository.repo';
import { Cv, CvState } from '../../Dominio/AggRoots/CV/cv.root';

export class InMemoryCvCommandRepository
  implements ICVCommandRepository
{
  private cv: Cv[] = [];

  change(id: string, cv: Cv<CvState>): Promise<void> {
      throw new Error('Method not implemented.');
  }
  getOne(id: string): Promise<Cv<CvState>> {
      throw new Error('Method not implemented.');
  }
  
  async getAll(): Promise<Cv<CvState>[]> {
    console.log(this.cv);
    console.log("get all");
    return this.cv;
  }
  

  async save(cv: Cv): Promise<void> {
    this.cv.push(cv);
    console.log("guardar");
    console.log(cv);
  }

  

}
