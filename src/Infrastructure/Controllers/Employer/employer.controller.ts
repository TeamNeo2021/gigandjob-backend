import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { EmployerApplicationService } from 'src/Application/ApplicationServices/Employer/employer.service';
import { CreateEmployerCommandDTO } from 'src/Application/DTO/CreateEmployer.dto';
import { EmployerStates } from 'src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo';

type CreateEmployerData = {
    name: string,
    description: string,
    location: string, 
    state: string, 
    rif: string,
    phone: string,
    mail: string,
    comDesignation: string
}

@Controller('employers')
export class EmployerController {
    constructor(@Inject('EmployerApplicationService') private employerService: EmployerApplicationService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() body: CreateEmployerData) {
        await this.employerService.Handle(
            new CreateEmployerCommandDTO(
                body.name, 
                body.description, 
                body.location,
                EmployerStates[body.state],
                body.rif,
                body.phone,
                body.mail,
                body.comDesignation
            )
        )
        return 'Offer has been created'
    }
}

