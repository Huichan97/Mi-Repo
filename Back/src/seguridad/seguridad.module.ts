import { Module } from '@nestjs/common';
import { SeguridadService } from './seguridad.service';
import { SeguridadController } from './seguridad.controller';

@Module({
  providers: [SeguridadService],
  controllers: [SeguridadController]
})
export class SeguridadModule {}
