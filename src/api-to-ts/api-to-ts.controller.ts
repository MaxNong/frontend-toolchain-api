import { Controller, Get, Query } from '@nestjs/common';
import { ApiToTsService } from './api-to-ts.service';

@Controller('ts')
export class ApiToTsController {
    sort: number;
    constructor(private readonly ApiToTsService: ApiToTsService) {
        this.sort = 1
    }

    // 通过json数据生成DTS
    generate(obj: any) {
        let dtsArray = []
        const writeObj = this.loopResult(obj, dtsArray, '')
        let dts = this.groupDts(dtsArray, writeObj)
        let transformed = this.transformDts(dts)

        return transformed
    }

    loopResult(loopData, dtsArray, dataName) {
        if (Array.isArray(loopData)) {
            let sortCopy = this.sort
            let dtsName = `${dataName}${sortCopy}`
            let newArray = `${dataName}: Array<${dtsName}>`
            this.sort++
            loopData.forEach(item => {
                let dtsNameDts = this.loopResult(item, dtsArray, '')
                dtsArray.push({
                    [dtsName]: dtsNameDts
                })
            })
            return newArray
        } else {
            let newObj = {}
            Object.keys(loopData).forEach((objectkey) => {
                let objectValue = loopData[objectkey]
                if (this.isSimpleData(objectValue)) {
                    newObj[objectkey] = `${objectkey}: ${this.getType(objectValue)}`
                } else {
                    newObj[objectkey] = this.loopResult(objectValue, dtsArray, objectkey)
                }
            })
            return newObj
        }
    }

    isSimpleData(params) {
        return (typeof params != 'object') || Object.prototype.toString.call(params) == '[object Null]'
    }

    getType(param) {
        const typeStr = Object.prototype.toString.call(param)
        switch (typeStr) {
            case '[object String]':
                return 'string';
            case '[object Number]':
                return 'number';
            case '[object Null]':
                return 'null';
            case '[object Boolean]':
                return 'boolean';
            default:
                return 'any';
        }
    }

    groupDts(fullAll, main) {
        let dts = {}
        fullAll.forEach(item => {
            let key = Object.keys(item)[0]
            let value = Object.values(item)[0]
            dts[key] = value
        })
        dts = { main, ...dts }

        return dts
    }

    transformDts(obj) {
        let totalStr = ''
        Object.keys(obj).forEach(mainKey => {
            let contetnStr = ''
            let currentStr = ''
            Object.keys(obj[mainKey]).forEach(item => {
                contetnStr = contetnStr + obj[mainKey][item] + ',' + '\n'
            })
            currentStr = `type ${mainKey} = {\n${contetnStr}}`
            totalStr = totalStr + '\n' + currentStr
        })

        return totalStr
    }

    @Get('/getDTS')
    async getDTS(@Query() Params: { url: string }): Promise<any> {
        const { url } = Params;
        console.log(url)
        if (!url) {
            return {
                code: 0,
                message: 'url参数错误',
                data: {}
            };
        }
        let remoteMockData = {}
        try {
            remoteMockData = await this.ApiToTsService.getRemoteMockData(url)
        } catch {
            return {
                code: 0,
                message: 'url解析异常，请检查url地址是否正确',
                data: {}
            };
        }

        const dtsData = this.generate(remoteMockData)
        return {
            code: 1,
            message: '获取成功',
            data: {
                dts: dtsData
            }
        };
    }
}
