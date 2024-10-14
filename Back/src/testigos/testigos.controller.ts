import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { TestigosService } from './testigos.service';
import { Testigo } from './testigo.entity'; // Usar la entidad en lugar de la interfaz

@Controller('testigos')
export class TestigosController {
  constructor(private readonly testigosService: TestigosService) { }

  @Get('todos')
  async obtenerTestigos(): Promise<Testigo[]> {  // Cambiado a Promise
    return this.testigosService.obtenerTestigos();
  }

  @Get(':id')
  async obtenerTestigo(@Param('id') id: string): Promise<Testigo> {  // Cambiado a Promise
    return this.testigosService.obtenerTestigo(Number(id));
  }

  @Post('agregar')
  async agregarTestigo(@Body() testigo: Testigo): Promise<{ success: boolean; mensaje: string }> {
    return this.testigosService.agregarTestigo(testigo);
  }

  @Delete('eliminar/:id')
  async eliminarTestigo(@Param('id') id: string): Promise<{ success: boolean; mensaje: string }> {
    return this.testigosService.eliminarTestigo(Number(id));
  }

  @Put('modificar/:id')
  async modificarTestigo(@Param('id') id: string, @Body() nuevoTestigo: Testigo): Promise<{ success: boolean; mensaje: string }> {
    return this.testigosService.modificarTestigo(Number(id), nuevoTestigo);
  }
}
