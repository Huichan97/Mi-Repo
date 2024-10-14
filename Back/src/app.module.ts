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
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testigo } from './testigos/testigo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O la IP de tu servidor PostgreSQL
      port: 1234,
      username: 'postgres', // Cambia esto a tu usuario de PostgreSQL
      password: 'root', // Cambia esto a tu contraseña de PostgreSQL
      database: 'soul', // El nombre de la base de datos
      entities: [Testigo], // Importa todas tus entidades
      synchronize: true,
    }),
    ConfiguracionModule,
    TestigosModule,
    BeneficiariosModule,
    UsuarioModule,
    SeguridadModule],
  controllers: [AppController],
  providers: [AppService, CorreoService],
})
export class AppModule {}
