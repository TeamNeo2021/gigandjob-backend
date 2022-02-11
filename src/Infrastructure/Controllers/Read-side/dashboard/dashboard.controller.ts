import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Param } from '@nestjs/common';
import { get } from 'http';
import { DashboardWebModelDTO } from 'src/Application/DTO/QueryModel DTO\'s/dashboard_web.dto';
import { DashboardWebQueryModel } from 'src/Application/QueryModels/DashboardWebQueryModel';
import { DashboardWebQueryFirestoreAdapter } from 'src/Infrastructure/Firestore/DashboardWebQueryFirestoreAdapter';

@Controller('dashboard')
export class DashboardController {
    

    constructor(private queryModel: DashboardWebQueryFirestoreAdapter){}
    @Get()
    @HttpCode(200)
    @Header("Access-Control_Allow_Origin", "*")
    async getDashboardModel(){
        const query = await this.queryModel.getModel()

        if (!query) throw new HttpException(
            'Could not find a register with that date',
            HttpStatus.NO_CONTENT);

        return query;
    }
}
