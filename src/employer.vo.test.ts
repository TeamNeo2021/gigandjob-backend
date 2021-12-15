import { Test, TestingModule } from '@nestjs/testing';
import { EmployerNameVo } from './Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo';
describe('AppController', () => {
  let empNameVo: EmployerNameVo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployerNameVo],
      providers: [],
    }).compile();
    empNameVo = app.get<EmployerNameVo>(EmployerNameVo);
  });

  describe('root', () => {
    empNameVo = new EmployerNameVo('hola');
    it('should return "Hello World!"', () => {
      expect(empNameVo.value).toBe('Hola');
    });
  });
});
