import { EmployerApplicationService } from 'src/Application/ApplicationServices/Employer/employer.service';
import { CreateEmployerCommandDTO } from 'src/Application/DTO/CreateEmployer.dto';
import { EmployerStates } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';

describe('Register Employer', () => {
  it('should register an employer', async () => {
    const getMockFn = jest.fn(),
      getAllMockFn = jest.fn(),
      saveMockFn = jest.fn(),
      employerApplicationService = new EmployerApplicationService({
        get: getMockFn,
        getAll: getAllMockFn,
        save: saveMockFn,
        eliminate: jest.fn(),
      }, {
        publish: jest.fn()
      }),
      registerEmployerCommand = new CreateEmployerCommandDTO(
        'Michael Nelo',
        'This is a test employer',
        {
          latitude: 90,
          longitude: 90,
        },
        EmployerStates.Active,
        'J-123123123',
        '+58 4241956647',
        'mknelo.18@est.ucab.edu.ve',
        'Some comDesignation',
      );

    await employerApplicationService.Handle(registerEmployerCommand);
    expect(saveMockFn).toHaveBeenCalled();
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'name',
      'Michael Nelo',
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'description',
      'This is a test employer',
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'location',
      {
        latitude: 90,
        longitude: 90,
      },
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'state',
      'Active',
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'rif',
      'J-123123123',
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'phone',
      '+58 4241956647',
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'mail',
      'mknelo.18@est.ucab.edu.ve',
    );
    expect(saveMockFn.mock.calls[0][0]).toHaveProperty(
      'comDesignation',
      'Some comDesignation',
    );  
  });
}); 
