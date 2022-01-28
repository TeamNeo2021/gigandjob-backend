import { resolve } from 'path/posix';
import { ICVCommandRepository } from '../../Application/Repositories//CVCommandRepository.repo';
import { Cv } from '../../Dominio/AggRoots/CV/cv.root';

export class InMemoryCvCommandRepository
  implements ICVCommandRepository
{
  private cv: Cv[] = [];

  save(cv: Cv): Promise<Cv> {
    this.cv.push(cv);
    resolve(cv);
  }

}
