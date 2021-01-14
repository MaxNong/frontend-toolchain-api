import { Module, HttpModule } from '@nestjs/common';
import { ApiToTsController } from './api-to-ts.controller'
import {ApiToTsService} from './api-to-ts.service'

@Module({
    imports: [HttpModule],
    controllers: [ApiToTsController],
    providers: [ApiToTsService],
})
export class ApiToTsModule { }
