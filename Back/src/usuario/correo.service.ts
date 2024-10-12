import { Injectable } from '@nestjs/common';
import * as postmark from 'postmark';
import { randomBytes } from 'crypto';

@Injectable()
export class CorreoService {
  private client: postmark.ServerClient;

  constructor() {
    // Reemplaza con tu API token de Postmark
    this.client = new postmark.ServerClient('30f9d6ce-681c-4a83-9daf-776826e52c3e');
  }

  // Generar token único
  generarToken(): string {
    return randomBytes(16).toString('hex');
  }

  // Enviar correo de confirmación
  async enviarCorreoConfirmacion(correoOriginal: string, correoReemplazo: string, token: string) {
    const correoEnmascarado = this.enmascararCorreo(correoOriginal);
    const enlaceConfirmacion = `http://localhost:3000/usuario/verificar-cambio-correo?token=${token}&correo=${correoReemplazo}`;
    const mensaje = `Estás confirmando la cuenta del correo [${correoEnmascarado}]. 
    Si no eres el usuario, ignora este mensaje.
    Para confirmar el cambio de correo, haz clic en el siguiente enlace: ${enlaceConfirmacion}`;

    try {
      const result = await this.client.sendEmail({
        From: 'fe.huichan@duocuc.cl',  // Correo registrado en Postmark
        To: correoReemplazo,               // Correo de reemplazo
        Subject: 'Confirmación de cambio de correo',
        TextBody: mensaje,
      });
      console.log('Correo enviado correctamente:', result);
      return { success: true };
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return { success: false, error: error.message };
    }
  }

  enmascararCorreo(correo: string): string {
    const [nombreUsuario, dominio] = correo.split('@');
    const enmascarado = nombreUsuario.substring(0, 3) + '********';
    return `${enmascarado}@${dominio}`;
  }
}
