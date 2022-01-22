import { EmployerTransactionService } from "src/Application/ApplicationServices/Employer/transaction.interface";
import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerComercialDesignationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";
import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
import { EmployerMailVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerNameVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerPhoneVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo";
import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";
import { EmployerStates, EmployerStateVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
import { EmployerCommand, EmployerCommandResult } from "./command.interface";

export class CreateEmployerCommand implements EmployerCommand<void> {
    constructor(
        private name: string,
        private description: string,
        private location: string,
        private state: EmployerStates, 
        private rif: string,
        private phone: string,
        private mail: string,
        private comDesignation: string
    ) {

    }

    execute(_: EmployerTransactionService): Promise<EmployerCommandResult<void>> {
        const employer = Employer.RegisterEmployer(
            new EmployerNameVO(this.name),
            new EmployerDescriptionVO(this.description),
            new EmployerStateVO(this.state),
            new EmployerLocationVO(this.location),
            new EmployerRifVO(this.rif),
            new EmployerPhoneVO(this.phone),
            new EmployerMailVO(this.mail),
            new EmployerComercialDesignationVO(this.comDesignation)
        )

        return Promise.resolve(EmployerCommandResult.nothing(employer))
    }
}