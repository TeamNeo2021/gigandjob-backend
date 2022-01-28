import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post } from '@nestjs/common';
import { CandidateApplicationService } from '../../Application/ApplicationServices/CandidateApplicationService.service';
import { CandidateRegisterDTO } from 'src/Application/DTO/Candidate/RegisterCandidate.dto';
import { SuspendCandidateDTO } from 'src/Application/DTO/Candidate/SuspendCandidate.dto';
import { ReactivateCandidateDTO } from 'src/Application/DTO/Candidate/ReactivateCandidate.dto';
import { EliminateCandidateDTO } from 'src/Application/DTO/Candidate/EliminateCandidate.dto';

type CaniddateSuspensionBody = {
    until: string
}

@Controller('candidates')
export class CandidateController {
    constructor(@Inject('CandidateApplicationService') private service: CandidateApplicationService) {}

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

    @Post(":id/suspend")
    async suspendCandidate(@Param('id') candidateId: string, @Body() suspensionBody: CaniddateSuspensionBody) {
        await this.service.Handle(new SuspendCandidateDTO(candidateId, new Date(Date.parse(suspensionBody.until))))
        return 'Candidate suspended'
    }
    
    @Post(":id/reactivate")
    async reactivateCandidate(@Param('id') candidateId: string) {
        await this.service.Handle(new ReactivateCandidateDTO(candidateId))
        return 'Candidate reactivated'
    }
    
    @Delete(":id")
    async delete(@Param('id') candidateId: string) {
        await this.service.Handle(new EliminateCandidateDTO(candidateId))
        return 'Candidate deleted'
    }
}

