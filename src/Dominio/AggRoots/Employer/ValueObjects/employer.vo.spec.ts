import { Test, TestingModule } from '@nestjs/testing';
import { Employer } from '../Employer';

describe('Metodos de employer', () => {
  let _Employer: Employer;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Employer],
      providers: [],
    }).compile();

    _Employer = app.get<Employer>(Employer);
  });

  describe('Reigistrar Empleador', () => {
    it('should return "Hola"', () => {
      _Employer = new Employer();
      _Employer.RegistrarEmpleado(
        'NombrePrueba',
        'Descripción de prueba',
        null,
        null,
        null,
        null,
        null,
      );
      expect(_Employer.Name.value).toBe('NombrePrueba');
      expect(_Employer.Description).toBe('Descripción de prueba');
    });
  });
});
