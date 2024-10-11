import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiariosController } from './beneficiarios.controller';

describe('BeneficiariosController', () => {
  let controller: BeneficiariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficiariosController],
    }).compile();

    controller = module.get<BeneficiariosController>(BeneficiariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
