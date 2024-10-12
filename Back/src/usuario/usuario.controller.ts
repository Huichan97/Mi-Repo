// usuario.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario') // Esto define la ruta base como /usuario
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login') // La ruta completa será /usuario/login
  login(@Body() body: { usuario: string; contrasena: string }) {
    const { usuario, contrasena } = body;
    return this.usuarioService.login(usuario, contrasena);
  }
}
