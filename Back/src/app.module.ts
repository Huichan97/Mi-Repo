import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { TestigosModule } from './testigos/testigos.module';
import { BeneficiariosModule } from './beneficiarios/beneficiarios.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CorreoService } from './usuario/correo.service';
import { ConfigModule } from '@nestjs/config';
import { SeguridadModule } from './seguridad/seguridad.module';

@Module({
  imports: [
    ConfiguracionModule,
    TestigosModule,
    BeneficiariosModule,
    UsuarioModule,
    ConfigModule.forRoot(),
    SeguridadModule],
  controllers: [AppController],
  providers: [AppService, CorreoService],
})
export class AppModule {}
