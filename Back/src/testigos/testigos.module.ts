import { Module } from '@nestjs/common';
import { TestigosService } from './testigos.service';
import { TestigosController } from './testigos.controller';

@Module({
  controllers: [TestigosController],
  providers: [TestigosService],
})
export class TestigosModule {}
