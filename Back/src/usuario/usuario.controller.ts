import { Controller, Post, Get, Body, Query, Res } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('usuario')
export class UsuarioController {
  private tokens: Map<string, string> = new Map();  // Simula el almacenamiento temporal de tokens

  constructor(private readonly correoService: CorreoService) {}

  // Ruta dinámica para localizar usuarios.json tanto en dist como en src
  private getUsuariosFilePath(): string {
    const distPath = path.join(__dirname, '..', 'data', 'usuarios.json');
    const srcPath = path.join(__dirname, '..', '..', 'src', 'data', 'usuarios.json');
    return fs.existsSync(distPath) ? distPath : srcPath;
  }

  // Enviar el correo de verificación
  @Post('enviar-verificacion')
  async enviarCorreoVerificacion(@Body() body, @Res() res: Response) {
    const { correoOriginal, correoReemplazo } = body;

    // Generar un token único
    const token = this.correoService.generarToken();
    this.tokens.set(token, correoOriginal);  // Guardar el token asociado al correo original

    // Enviar el correo de confirmación
    const resultado = await this.correoService.enviarCorreoConfirmacion(correoOriginal, correoReemplazo, token);
    if (resultado.success) {
      return res.json({ success: true, message: 'Correo de confirmación enviado.' });
    } else {
      return res.status(500).json({ success: false, message: 'Error al enviar el correo de confirmación.' });
    }
  }

  // Verificar el token y actualizar el correo
  @Get('verificar-cambio-correo')
  async verificarCambioCorreo(@Query('token') token: string, @Query('correo') correo: string, @Res() res: Response) {
    const correoAsociado = this.tokens.get(token); // Verificar si el token es válido

    if (correoAsociado && correoAsociado !== '') {
      this.tokens.delete(token);  // El token se invalida después de usarse

      // Ruta correcta del archivo usuarios.json
      const usuariosFilePath = this.getUsuariosFilePath();

      // Leer el archivo usuarios.json
      fs.readFile(usuariosFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error leyendo el archivo de usuarios:', err);
          return res.status(500).json({ success: false, message: 'Error en el servidor.' });
        }

        const usuarios = JSON.parse(data);

        // Buscar el usuario de ejemplo y actualizar su correo
        const usuario = usuarios.usuarios.find((u) => u.id === 1);
        if (usuario) {
          usuario.correo = correo;

          // Guardar los cambios en usuarios.json
          fs.writeFile(usuariosFilePath, JSON.stringify(usuarios, null, 2), 'utf8', (err) => {
            if (err) {
              console.error('Error actualizando el archivo de usuarios:', err);
              return res.status(500).json({ success: false, message: 'Error al actualizar el usuario.' });
            }

            return res.json({ success: true, nuevoCorreo: correo });
          });
        } else {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }
      });
    } else {
      return res.status(400).json({ success: false, message: 'El token es inválido o ha expirado.' });
    }
  }

  // Obtener el correo actual del usuario
  @Get('obtener-correo')
  async obtenerCorreo(@Res() res: Response) {
    const usuariosFilePath = this.getUsuariosFilePath();  // Usar la ruta dinámica

    fs.readFile(usuariosFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo de usuarios:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
      }

      const usuarios = JSON.parse(data);
      const usuario = usuarios.usuarios.find((u) => u.id === 1);  // Buscar al usuario de ejemplo

      if (usuario) {
        return res.json({ success: true, correo: usuario.correo });
      } else {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      }
    });
  }
}
