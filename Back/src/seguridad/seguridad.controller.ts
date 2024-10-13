// seguridad.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { SeguridadService } from './seguridad.service';

@Controller('seguridad')
export class SeguridadController {
  constructor(private readonly seguridadService: SeguridadService) {}

  // Configurar PIN
  @Post('configurar-pin')
  async configurarPin(@Body('pin') pin: string): Promise<string> {
    return await this.seguridadService.configurarPin(pin);
  }

  // Configurar Contraseña
  @Post('configurar-password')
  async configurarPassword(@Body('password') password: string): Promise<string> {
    return await this.seguridadService.configurarPassword(password);
  }

  // Verificar PIN
  @Post('verificar-pin')
  async verificarPin(@Body('pin') pin: string): Promise<{ success: boolean }> {
    const esValido = await this.seguridadService.verificarPin(pin);
    return { success: esValido };
  }

  // Verificar Contraseña
  @Post('verificar-password')
  async verificarPassword(@Body('password') password: string): Promise<{ success: boolean }> {
    const esValido = await this.seguridadService.verificarPassword(password);
    return { success: esValido };
  }
}
