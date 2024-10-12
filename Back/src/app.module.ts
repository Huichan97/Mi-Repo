import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { TestigosModule } from './testigos/testigos.module';
import { BeneficiariosModule } from './beneficiarios/beneficiarios.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ConfiguracionModule, TestigosModule, BeneficiariosModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
