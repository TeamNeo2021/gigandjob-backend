import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post } from '@nestjs/common';
import { CandidateApplicationService } from '../../../Application/ApplicationServices/CandidateApplicationService.service';
import { CandidateRegisterDTO } from '../../../Application/DTO/Candidate/RegisterCandidate.dto';
import { SuspendCandidateDTO } from '../../../Application/DTO/Candidate/SuspendCandidate.dto';
import { ReactivateCandidateDTO } from '../../../Application/DTO/Candidate/ReactivateCandidate.dto';
import { EliminateCandidateDTO } from '../../../Application/DTO/Candidate/EliminateCandidate.dto';
import { Authorize } from 'src/Infrastructure/Decorators/Auth/Authorize';
import { AuthedUser } from 'src/Infrastructure/Decorators/Auth/AuthedUser';
import { UserDTO } from 'src/Application/DTO/User/User.dto';
import { CandidateFirestoreAdapter } from 'src/Infrastructure/Firestore/CandidateFirestoreAdapter.adapter';
import { EntitiesFactory } from 'src/Application/Core/EntitiesFactory.service';

type CaniddateSuspensionBody = {
    until: string
}

type CandidateRegisterData = {
    name: {
        firstname: string
        lastnames: string
    }
    phone: {
        areaCode: string
        phoneNumber: string
    }
    email: string 
    birthdate: string 
    location: {
        latitude: number,
        longitude: number
    }
    password: string
}

@Controller('Candidate')
export class CandidateController {
    constructor(
        @Inject('CandidateApplicationService') private service: CandidateApplicationService,
        private repository: CandidateFirestoreAdapter
    ) {}

    @Get('profile')
    @Authorize()
    async get(@AuthedUser() user: UserDTO) {
        return EntitiesFactory.fromCandidateToCandidateDTO(await this.repository.getOne(user.id))
    }

    @Post()
    @HttpCode(201)
    async createOffer(@Body() body: CandidateRegisterData): Promise<string> {
        this.service.Handle(
            new CandidateRegisterDTO(
                body.name.firstname,
                body.name.lastnames,
                body.phone.areaCode,
                body.phone.phoneNumber,
                body.email,
                body.birthdate,
                body.location.latitude,
                body.location.longitude,
                body.password
            )
        );
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

