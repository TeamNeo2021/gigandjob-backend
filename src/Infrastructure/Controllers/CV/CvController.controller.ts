import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Req } from '@nestjs/common';
import { CvService } from 'src/Application/ApplicationServices/CvService.service';
import { RequestCvApprovalDTO } from 'src/Application/DTO/Candidate/RequestCvApproval.dto';

type work = {
    description: string,
    startDate: string,
    finishDate: string,
    job: string
}

type studies = {
    description: string
    startDate: string
    finishDate: string
    institution: string
    degree: string
}

@Controller('CV')
export class CVController {
    constructor(@Inject('CvService') private service: CvService) {}

    @Post()
    @HttpCode(201)
    async RequestCVApproval(
        @Body('CvID') cvID: string,
        @Body('CandidateID') candidateID: string,
        @Body('description') description: string,
        @Body('workExperiences') workExperiences: [work],
        @Body('studies') studies: [studies],
        @Body('Buffer') photo: String,
        @Body('CandidateBirthdate') candidatebirthdate: string,
        @Body() body,
        @Req() req
    ) {
        let request: RequestCvApprovalDTO = new RequestCvApprovalDTO(
            cvID,
            candidateID,
            description,
            workExperiences,
            studies, 
            Buffer.from(photo, 'base64'),
            candidatebirthdate,
        )

        await this.service.Handle(request);
        return 'CV has been submitted for approval'
    }
}

