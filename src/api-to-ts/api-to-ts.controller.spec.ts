import { Test, TestingModule } from '@nestjs/testing';
import { ApiToTsController } from './api-to-ts.controller';

describe('ApiToTsController', () => {
  let controller: ApiToTsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiToTsController],
    }).compile();

    controller = module.get<ApiToTsController>(ApiToTsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
