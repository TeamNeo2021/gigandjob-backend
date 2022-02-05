import { Body, Controller, HttpCode, Inject, Post, Put } from '@nestjs/common';
import { EmployerApplicationService } from 'src/Application/ApplicationServices/Employer/employer.service';
import { CreateEmployerCommandDTO } from 'src/Application/DTO/CreateEmployer.dto';
import { EliminateEmployerDTO } from 'src/Application/DTO/EliminateEmployer.dto';
import { ReactivateEmployerDTO } from 'src/Application/DTO/ReactivateEmployer.dto';
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
    //private readonly employerApplicationService: EmployerApplicationService;
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
        return 'Employer has been created'
    }

    @Put('Reactivated') // PUT /employers/Reactivated
    ReactivateEmployer(@Body('id') id: string): any {
    let request: ReactivateEmployerDTO = new ReactivateEmployerDTO(id);
    this.employerService.Handle(request);
    return 'Esta accion reactiva un Empleador';
  }

    @Put('Eliminated') // PUT /employers/Eliminated
    EliminateEmployer(@Body('id') id: string): any {
    let request: EliminateEmployerDTO = new EliminateEmployerDTO(id);
    this.employerService.Handle(request);
    return 'Esta accion elimina un Empleador';
  }
}

