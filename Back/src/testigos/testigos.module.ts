import { Module } from '@nestjs/common';
import { TestigosController } from './testigos.controller';
import { TestigosService } from './testigos.service';

@Module({
  controllers: [TestigosController],
  providers: [TestigosService],
})
export class TestigosModule {}
