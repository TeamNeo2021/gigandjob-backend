import { InvalidEmployerComercialDesignation } from '../../AggRoots/Employer/Errors/InvalidEmployerComercialDesignation.error';
import { EmployerComercialDesignationVO } from '../../AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo';

describe('Employer Comercial Designation', () => {
  it('should not create when value is empty', () => {
    expect(() => EmployerComercialDesignationVO.Create('')).toThrowError(
      InvalidEmployerComercialDesignation,
    );
  });
  it('should not create when the value has more than 100 characters ', () => {
    expect(() =>
      EmployerComercialDesignationVO.Create(
        'naonfnfuofauafuoauafuafaaalfaanjjajnajnajanjjfjfajjnajnnaonfnfuofauafuoauafuafaaalfaanjjajnajnajanjjfjfajjnajn',
      ),
    ).toThrowError(InvalidEmployerComercialDesignation);
  });
  it(' Create when the value is less than 100 characters and is not empty ', () => {
    expect(EmployerComercialDesignationVO.Create('asdfghj')).toBeInstanceOf(
      EmployerComercialDesignationVO,
    );
  });
});
