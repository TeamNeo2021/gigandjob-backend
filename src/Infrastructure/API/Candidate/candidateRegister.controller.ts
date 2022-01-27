import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InMemoryCandidateCommandRepository } from '../.././Memory/InMemoryCandidateCommandRepository.repo';
import { ICandidateCommandRepository } from '../../../Application/Repositories/CandidateCommandRepository.repo';
import { ICandidateQuerryRepository } from '../../../Application/Repositories/CandidateQuerryRepository.repo';
import { IApplicationService } from '../../../Application/Core/IApplicationService';
import { CandidateRegisterService } from '../../../Application/ApplicationServices/CandidateRegister.service';


@Controller('registerCandidate')
export class CandidateApi {
    private readonly services: IApplicationService[];
    private readonly commandRepository: ICandidateCommandRepository;
    private readonly querryRepository: ICandidateQuerryRepository;

    constructor(){
        const command = new InMemoryCandidateCommandRepository();
        const querry = new InMemoryCandidateCommandRepository();

        this.services.push(new CandidateRegisterService(command));
        this.commandRepository = command;
        this.querryRepository = querry;
    }

    @Post()
    @HttpCode(201)
    createOffer(
        @Body('name') name: string,
        @Body('lastname') lastname: string,
        @Body('phoneCode') phoneCode: string,
        @Body('phoneNumber') phoneNumber: string,
        @Body('email') email: string,
        @Body('Bday') Bday: string,
        @Body('latitud') latd: Number,
        @Body('longitude') long: Number
    ): string {
        let request = {
            name,
            lastname,
            phoneCode,
            phoneNumber,
            email,
            Bday,
            latd,
            long
        }
        this.services[0].Handle(request);
        return 'Offer has been created'
    }
}

