import { Module } from '@nestjs/common';
import { BeneficiariosController } from './beneficiarios.controller';
import { BeneficiariosService } from './beneficiarios.service';
import { BeneficiariosService } from './beneficiarios.service';
import { BeneficiariosController } from './beneficiarios.controller';

@Module({
  controllers: [BeneficiariosController],
  providers: [BeneficiariosService]
})
export class BeneficiariosModule {}
