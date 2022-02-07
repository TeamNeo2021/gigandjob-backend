import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post } from '@nestjs/common';
import { CandidateApplicationService } from '../../../Application/ApplicationServices/CandidateApplicationService.service';
import { CandidateRegisterDTO } from '../../../Application/DTO/Candidate/RegisterCandidate.dto';
import { SuspendCandidateDTO } from '../../../Application/DTO/Candidate/SuspendCandidate.dto';
import { ReactivateCandidateDTO } from '../../../Application/DTO/Candidate/ReactivateCandidate.dto';
import { EliminateCandidateDTO } from '../../../Application/DTO/Candidate/EliminateCandidate.dto';

type CaniddateSuspensionBody = {
    until: string
}

type CandidateRegisterData = {
    name: {
        firtstname: string
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
}

@Controller('Candidate')
export class CandidateController {
    constructor(@Inject('CandidateApplicationService') private service: CandidateApplicationService) {}

    @Post()
    @HttpCode(201)
    async createOffer(@Body() body: CandidateRegisterData): Promise<string> {
        this.service.Handle(
            new CandidateRegisterDTO(
                body.name.firtstname,
                body.name.lastnames,
                body.phone.areaCode,
                body.phone.phoneNumber,
                body.email,
                body.birthdate,
                body.location.latitude,
                body.location.longitude
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

