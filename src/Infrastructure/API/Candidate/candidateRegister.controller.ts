import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { InMemoryCandidateCommandRepository } from '../.././Memory/InMemoryCandidateCommandRepository.repo';
import { ICandidateCommandRepository } from '../../../Application/Repositories/CandidateCommandRepository.repo';
import { ICandidateQuerryRepository } from '../../../Application/Repositories/CandidateQuerryRepository.repo';
import { IApplicationService } from '../../../Application/Core/IApplicationService';
import { CandidateRegisterService } from '../../../Application/ApplicationServices/CandidateRegister.service';

@Controller('registerCandidate')
export class CandidateApi {
    private readonly registerService: IApplicationService;
    private readonly commandRepository: ICandidateCommandRepository;
    private readonly querryRepository: ICandidateQuerryRepository;

    constructor(){
        this.commandRepository = new InMemoryCandidateCommandRepository();
        this.querryRepository = new InMemoryCandidateCommandRepository();

        this.registerService = new CandidateRegisterService(this.commandRepository);
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
        let request = {
            name,
            lastname,
            phoneCode,
            phoneNumber,
            email,
            birthDate,
            latitude,
            longitude
        }

        this.registerService.Handle(request);
        return 'Candidate has been registed'
    }
}

