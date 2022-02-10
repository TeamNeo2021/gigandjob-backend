import { EmployerRepository } from "src/Application/Repositories/Employer/repository.interface";
import { CreateEmployerCommandDTO } from "src/Application/DTO/CreateEmployer.dto";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerNameVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerStates, EmployerStateVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerPhoneVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo";
import { EmployerMailVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerComercialDesignationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";
import { EntitiesFactory } from "src/Application/Core/EntitiesFactory.service";
import { ReactivateEmployerDTO } from "src/Application/DTO/Employer/ReactivateEmployer.dto";
import { EliminateEmployerDTO } from "src/Application/DTO/Employer/EliminateEmployer.dto";
import { Publisher } from "src/Application/Publisher/publisher.interface";

export class EmployerApplicationService {
    constructor(private repository: EmployerRepository, private publisher: Publisher) {}

    async Handle(command: any): Promise<void> {
        switch (command.constructor){

            /*case ReactivateEmployerDTO: {
                const id = (command as ReactivateEmployerDTO).id,
                      employer = await this.repository.get(id)
                    
                if (!employer) throw new Error //CouldNotFindEmployerError(employer.employerId)

                employer.reactivateThisEmployer()
                await this.repository.save(employer)
                break;
            }*/

            case ReactivateEmployerDTO:{
                let cmd: ReactivateEmployerDTO = <ReactivateEmployerDTO> command;
                let employerReactivated = await this.repository.get(cmd.id)

                if (!employerReactivated) throw new Error //CouldNotFindEmployerError(employer.employerId)

                let newEmployerReactivated = EntitiesFactory.fromEmployerDtoToEmployer(employerReactivated);
                newEmployerReactivated.reactivateThisEmployer()
                await this.repository.save(EntitiesFactory.fromEmployerToEmployerDTO(newEmployerReactivated))
                break;
            }

            case EliminateEmployerDTO: {
                const id = (command as EliminateEmployerDTO).id,
                      employerDTO = await this.repository.get(id),
                      employer = EntitiesFactory.fromEmployerDtoToEmployer(employerDTO),
                      eliminatedEmployer = employer.EliminateEmployer(new EmployerStateVO(EmployerStates.Eliminated))

                await this.repository.eliminate(id)
                this.publisher.publish(eliminatedEmployer.GetChanges() as any[])
                break;
            }

            case CreateEmployerCommandDTO: {
                const cmd = command as CreateEmployerCommandDTO
                const employer = Employer.RegisterEmployer(
                    EmployerNameVO.Create(cmd.name),
                    EmployerDescriptionVO.Create(cmd.description),
                    new EmployerStateVO(cmd.state),
                    new EmployerLocationVO(cmd.location.latitude,cmd.location.longitude),
                    EmployerRifVO.Create(cmd.rif),
                    EmployerPhoneVO.Create(cmd.phone),
                    EmployerMailVO.Create(cmd.mail),
                    EmployerComercialDesignationVO.Create(cmd.comDesignation),
                )

                await this.repository.save(EntitiesFactory.fromEmployerToEmployerDTO(employer))
                this.publisher.publish(employer.GetChanges() as any[])
                break;
            }
        }
    }
}