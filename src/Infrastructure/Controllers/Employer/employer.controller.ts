import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { EmployerApplicationService } from 'src/Application/ApplicationServices/Employer/service.interface';
import { CreateEmployerDTO } from 'src/Application/DTO/Employer/CreateEmployer';

import { EmployerStates } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';

// type CreateEmployerData = {
//     name: string,
//     description: string,
//     location: string, 
//     state: string, 
//     rif: string,
//     phone: string,
//     mail: string,
//     comDesignation: string
// }

@Controller('employers')
export class EmployerController {
    constructor(@Inject('EmployerApplicationService') private employerService: EmployerApplicationService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() body: CreateEmployerDTO) { //TODO REVISAR
        // await this.employerService.execute(
        //     new CreateEmployerDTO(body)
        // )
        // return 'Offer has been created'
    }
}

