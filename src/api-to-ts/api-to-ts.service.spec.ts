import { Test, TestingModule } from '@nestjs/testing';
import { ApiToTsService } from './api-to-ts.service';

describe('ApiToTsService', () => {
  let service: ApiToTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiToTsService],
    }).compile();

    service = module.get<ApiToTsService>(ApiToTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
