import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { InMemoryCandidateRepository } from '../Memory/InMemoryCandidateRepository.repo';
import { ICandidateRepository } from '../../Application/Repositories/CandidateRepository.repo';
import { IApplicationService } from '../../Application/Core/IApplicationService';
import { CandidateApplicationService } from '../../Application/ApplicationServices/CandidateApplicationService.service';
import { CandidateRegisterDTO } from 'src/Application/DTO/Candidate/RegisterCandidate.dto';

@Controller('registerCandidate')
export class CandidateController {
    private readonly service: IApplicationService;
    private readonly repository: ICandidateRepository;

    constructor(){
        this.repository = new InMemoryCandidateRepository();

        this.service = new CandidateApplicationService(this.repository);
    }

    @Post()
    @HttpCode(201)
    createOffer(
        @Body('name') name: string,
        @Body('lastname') lastname: string,
        @Body('phoneCode') phoneCode: string,
        @Body('phoneNumber') phoneNumber: string,
        @Body('email') email: string,
        @Body('Bday') birthDate: string,
        @Body('latitude') latitude: Number,
        @Body('longitude') longitude: Number
    ): string {
        let request: CandidateRegisterDTO = new CandidateRegisterDTO(
            name,
            lastname,
            phoneCode,
            phoneNumber,
            email,
            birthDate,
            latitude,
            longitude
        )

        this.service.Handle(request);
        return 'Candidate has been registed'
    }
}

