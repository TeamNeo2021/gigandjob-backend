import { EmployerApplicationService } from "src/Application/ApplicationServices/Employer/employer.service"
import { CreateEmployerCommand } from "src/Application/Commands/Employer/create-employer.command"
import { LocationDTO } from "src/Application/DTO/Location.dto"
import { EmployerStates } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo"

describe('Register Employer', () => {
    it('should register an employer', async () => {
        const getMockFn = jest.fn(),
              getAllMockFn = jest.fn(),
              publishMockFn = jest.fn(),
              saveMockFn = jest.fn(),
              eliminateMockFn = jest.fn(),
              employerApplicationService = new EmployerApplicationService(
                  {
                      get: getMockFn,
                      getAll: getAllMockFn,
                      save: saveMockFn,
                      eliminate: eliminateMockFn
                  },
                  {
                      publish: publishMockFn
                  }
              ),
              registerEmployerCommand = new CreateEmployerCommand(
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

        await employerApplicationService.execute(registerEmployerCommand)
        expect(publishMockFn).toHaveBeenCalled()
        expect(publishMockFn.mock.calls[0][0][0]).toHaveProperty('ident', 'EmployerRegistered')
    })
})