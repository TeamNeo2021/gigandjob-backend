import { EmployerRepository } from "src/Application/Repositories/Employer/repository.interface";
import { ReactivateEmployerDTO } from "src/Application/DTO/ReactivateEmployer.dto";
import { EliminateEmployerDTO } from "src/Application/DTO/EliminateEmployer.dto";
import { CreateEmployerCommandDTO } from "src/Application/DTO/CreateEmployer.dto";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerNameVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerStateVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerPhoneVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo";
import { EmployerMailVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerComercialDesignationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";

export class EmployerApplicationService {
    constructor(private repository: EmployerRepository) {}

    async Handle(command: any): Promise<void> {
        switch (command.constructor){

            case ReactivateEmployerDTO: {
                const id = (command as ReactivateEmployerDTO).id,
                      employer = await this.repository.get(id)
                    
                if (!employer) throw new Error //CouldNotFindEmployerError(employer.employerId)

                employer.reactivateThisEmployer()
                await this.repository.save(employer)
                break;
            }

            case EliminateEmployerDTO: {
                const id = (command as EliminateEmployerDTO).id

                await this.repository.eliminate(id)
                break;
            }

            case CreateEmployerCommandDTO: {
                const cmd = command as CreateEmployerCommandDTO
                const employer = Employer.RegisterEmployer(
                    EmployerNameVO.Create(cmd.name),
                    EmployerDescriptionVO.Create(cmd.description),
                    new EmployerStateVO(cmd.state),
                    EmployerLocationVO.Create(cmd.location),
                    EmployerRifVO.Create(cmd.rif),
                    EmployerPhoneVO.Create(cmd.phone),
                    EmployerMailVO.Create(cmd.mail),
                    EmployerComercialDesignationVO.Create(cmd.comDesignation),
                )

                await this.repository.save(employer)
                break;
            }
        }
    }
}