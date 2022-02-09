import { IRepository } from './IRepository';

export class RepositoryModule {
  private _repository: IRepository;

  public get repository(): IRepository {
    return this._repository;
  }
  public set repository(value: IRepository) {
    this._repository = value;
  }

  constructor(repository: IRepository) {
    this.repository = repository;
  }
}
