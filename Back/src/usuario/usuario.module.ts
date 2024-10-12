import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { CorreoService } from './correo.service';

@Module({
  controllers: [UsuarioController],
  providers: [CorreoService],
})
export class UsuarioModule {}
