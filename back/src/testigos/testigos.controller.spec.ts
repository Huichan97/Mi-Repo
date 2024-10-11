import { Test, TestingModule } from '@nestjs/testing';
import { TestigosController } from './testigos.controller';

describe('TestigosController', () => {
  let controller: TestigosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestigosController],
    }).compile();

    controller = module.get<TestigosController>(TestigosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
