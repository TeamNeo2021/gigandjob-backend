import { EmployerComercialDesignationVO } from '../../AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo';
import { EmployerDescriptionVO } from '../../AggRoots/Employer/ValueObjects/EmployerDescriptionVO';
import { EmployerLocationVO } from '../../AggRoots/Employer/ValueObjects/EmployerLocationVO';
import { EmployerMailVO } from '../../AggRoots/Employer/ValueObjects/EmployerMailVo';
import { EmployerNameVO } from '../../AggRoots/Employer/ValueObjects/EmployerNameVo';
import { EmployerPhoneVO } from '../../AggRoots/Employer/ValueObjects/EmployerPhoneVo';
import { EmployerRifVO } from '../../AggRoots/Employer/ValueObjects/EmployerRifVO';
import {
  EmployerStates,
  EmployerStateVO,
} from '../../AggRoots/Employer/ValueObjects/EmployerStateVo';
import { EmployerEliminated } from '../../DomainEvents/EmployerEvents/EmployerEliminated';
import { EmployerRegistered } from '../../DomainEvents/EmployerEvents/EmployerRegistered';
import { Employer } from '../../AggRoots/Employer/Employer';
import { EmployerModified } from '../../DomainEvents/EmployerEvents/EmployerModified';
import { EmployerSuspended } from '../../DomainEvents/EmployerEvents/EmployerSuspended';

export const exampleEmployer = Employer.RegisterEmployer(
  EmployerNameVO.Create('Soluciones de Prueba'),
  EmployerDescriptionVO.Create('La descripcion es una prueba'),
  new EmployerStateVO(EmployerStates.Active),
  new EmployerLocationVO(24, 150),
  EmployerRifVO.Create('J-1236782'),
  EmployerPhoneVO.Create('+584124578457'),
  EmployerMailVO.Create('prueba@test.com'),
  EmployerComercialDesignationVO.Create('Informatica24.c.a'),
);

describe('crear un empleador', () => {
  it('debe crear un empleador cuando se crea con un estado activo', () => {
    expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
  });
});

describe('modificar un empleador', () => {
  it('debe modificar el empleador cuando se cambia el estado es activo o suspendido', () => {
    exampleEmployer.ModifyEmployer(
      EmployerNameVO.Create('Soluciones de Prueba'),
      EmployerDescriptionVO.Create('La descripcion ha sido modificada'),
      new EmployerLocationVO(90, 90),
      EmployerRifVO.Create('J-1236782'),
      EmployerPhoneVO.Create('+584124578457'),
      EmployerMailVO.Create('prueba@test.com'),
      EmployerComercialDesignationVO.Create('Informatica24.c.a'),
    );
    expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
    expect(exampleEmployer.GetChanges()[1]).toBeInstanceOf(EmployerModified);
  });
});

describe('Suspender un empleador', () => {
  it('debe suspender el empleador solamente si su estado es activo', () => {
    exampleEmployer.SuspendEmployer();
    expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
    expect(exampleEmployer.GetChanges()[1]).toBeInstanceOf(EmployerModified);
    expect(exampleEmployer.GetChanges()[2]).toBeInstanceOf(EmployerSuspended);
  });
});

describe('Eliminar un empleador', () => {
  it('debe eliminar el empleador independientemente del estado anterior', () => {
    exampleEmployer.EliminateEmployer(
      new EmployerStateVO(EmployerStates.Eliminated),
    );
    expect(exampleEmployer.GetChanges()[0]).toBeInstanceOf(EmployerRegistered);
    expect(exampleEmployer.GetChanges()[1]).toBeInstanceOf(EmployerModified);
    expect(exampleEmployer.GetChanges()[2]).toBeInstanceOf(EmployerSuspended);
    expect(exampleEmployer.GetChanges()[3]).toBeInstanceOf(EmployerEliminated);
  });
});

describe('modificar un empleador', () => {
  it('no debe modificar el empleador cuando su estado es eliminado', () => {
    expect(() =>
      exampleEmployer.ModifyEmployer(
        EmployerNameVO.Create('Soluciones de Prueba'),
        EmployerDescriptionVO.Create('La descripcion vuelve a ser una prueba'),
        new EmployerLocationVO(90, 90),
        EmployerRifVO.Create('J-1236782'),
        EmployerPhoneVO.Create('+584124578457'),
        EmployerMailVO.Create('prueba@test.com'),
        EmployerComercialDesignationVO.Create('Informatica24.c.a'),
      ),
    ).toThrowError(Error);
  });
});
