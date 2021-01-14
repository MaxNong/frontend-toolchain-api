import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ApiToTsService {
    constructor(private readonly httpService: HttpService){}

    // 通过mock系统的api地址获取接口数据
    async getRemoteMockData(url: string): Promise<any> {
        const resData = await this.httpService.get(url).toPromise()
        const remoteMockData = resData.data

        return remoteMockData
      }
}
