import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param } from '@nestjs/common';
import { get } from 'http';
import { DashboardWebModelDTO } from 'src/Application/DTO/QueryModel DTO\'s/dashboard_web.dto';
import { DashboardWebQueryModel } from 'src/Application/QueryModels/DashboardWebQueryModel';
import { DashboardWebQueryFirestoreAdapter } from 'src/Infrastructure/Firestore/DashboardWebQueryFirestoreAdapter';

@Controller('dashboard')
export class DashboardController {
    

    constructor(private queryModel: DashboardWebQueryFirestoreAdapter){}
    @Get('/:dateString')
    @HttpCode(200)
    @Header("Access-Control_Allow_Origin", "*")
    async getDashboardModel(@Param('dateString') dateString: string){
        const dateWithTime: Date = new Date(dateString)

        const cleanDate: Date = new Date(dateWithTime.toDateString())

        const query = await this.queryModel.getModel(cleanDate)

        if (!query) throw new HttpException(
            'Could not find a register with that date',
            HttpStatus.NO_CONTENT);

        return query;
    }
}
