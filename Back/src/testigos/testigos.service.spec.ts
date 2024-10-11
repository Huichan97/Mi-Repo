import { Test, TestingModule } from '@nestjs/testing';
import { TestigosService } from './testigos.service';

describe('TestigosService', () => {
  let service: TestigosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestigosService],
    }).compile();

    service = module.get<TestigosService>(TestigosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
