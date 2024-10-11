import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiariosService } from './beneficiarios.service';

describe('BeneficiariosService', () => {
  let service: BeneficiariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeneficiariosService],
    }).compile();

    service = module.get<BeneficiariosService>(BeneficiariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
