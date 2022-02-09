import { InvalidEmployerName } from '../../AggRoots/Employer/Errors/InvalidEmployerName.error';
import { EmployerNameVO } from '../../AggRoots/Employer/ValueObjects/EmployerNameVo';

describe('Employer Name', () => {
  it('Deberia fallar si el nombre es nulo', () => {
    //Validar que no es vacia
    expect(() => EmployerNameVO.Create('')).toThrowError(InvalidEmployerName);
  }),
    it('Deberia fallar si el nombre es mayor a 20 caracteres', () => {
      //Validar que no es mayor a 20 caracteres
      const nombre = new Array(21).fill('.').join('');
      expect(() => EmployerNameVO.Create(nombre)).toThrowError(
        InvalidEmployerName,
      );
    });

  it('Debería funcionar si le pasas un nombre ', () => {
    expect(EmployerNameVO.Create('Luis')).toBeInstanceOf(EmployerNameVO);
  });
});
