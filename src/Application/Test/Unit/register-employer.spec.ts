import { EmployerApplicationService } from "src/Application/ApplicationServices/Employer/employer.service"
import { CreateEmployerCommand } from "src/Application/Commands/Employer/create-employer.command"
import { CreateEmployerCommandDTO } from "src/Application/DTO/CreateEmployer.dto"
import { LocationDTO } from "src/Application/DTO/Location.dto"
import { EmployerStates } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo"

describe('Register Employer', () => {
    it('should register an employer', async () => {
        const getMockFn = jest.fn(),
              getAllMockFn = jest.fn(),
              saveMockFn = jest.fn(),
              employerApplicationService = new EmployerApplicationService(
                  {
                      get: getMockFn,
                      getAll: getAllMockFn,
                      save: saveMockFn,
                      eliminate: jest.fn()
                  }
              ),
              registerEmployerCommand = new CreateEmployerCommandDTO(
                  "Michael Nelo",
                  "This is a test employer",
                  new LocationDTO(
                      {
                          latitude:90,
                          longitude:90
                      }
                  ),
                  EmployerStates.Active,
                  "J-123123123",
                  "+58 4241956647",
                  "mknelo.18@est.ucab.edu.ve",
                  "Some comDesignation"
              )

        await employerApplicationService.Handle(registerEmployerCommand)
        expect(saveMockFn).toHaveBeenCalled()
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('name.value_name_employer', 'Michael Nelo')
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('description.value_employer_description', 'This is a test employer')
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('location.value_employer_location', 'Caracas Caricuao')
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('state.value_state', EmployerStates.Active)
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('rif.value_employer_rif', 'J-123123123')
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('phone.value_employer_phone', '+58 4241956647')
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('mail.value_employer_mail', 'mknelo.18@est.ucab.edu.ve')
        expect(saveMockFn.mock.calls[0][0]).toHaveProperty('comDesignation.value_comercial_designation', "Some comDesignation")
    })
})