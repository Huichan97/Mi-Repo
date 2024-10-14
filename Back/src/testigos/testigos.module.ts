import { Module } from '@nestjs/common';
import { TestigosService } from './testigos.service';
import { TestigosController } from './testigos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testigo } from './testigo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testigo])],
  controllers: [TestigosController],
  providers: [TestigosService],
})
export class TestigosModule {}
