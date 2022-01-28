import { resolve } from 'path/posix';
import { ICVCommandRepository } from '../../Application/Repositories/CVRepository.repo';
import { Cv, CvState } from '../../Dominio/AggRoots/CV/cv.root';

export class InMemoryCvCommandRepository
  implements ICVCommandRepository
{
  change(id: string, cv: Cv<CvState>): Promise<void> {
      throw new Error('Method not implemented.');
  }
  getOne(id: string): Promise<Cv<CvState>> {
      throw new Error('Method not implemented.');
  }
  getAll(): Promise<Cv<CvState>[]> {
      throw new Error('Method not implemented.');
  }
  private cv: Cv[] = [];

  async save(cv: Cv): Promise<Cv> {
    this.cv.push(cv);
    return cv
  }

  

}
