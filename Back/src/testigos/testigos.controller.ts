import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { TestigosService } from './testigos.service';
import { Testigo } from './testigo.inteface';

@Controller('testigos')
export class TestigosController {
  constructor(private readonly testigosService: TestigosService) { }

  @Get('todos')
  obtenerTestigos(): Testigo[] {
    return this.testigosService.obtenerTestigos();
  }  

  @Get(':id')
  obtenerTestigo(@Param('id') id: string): Testigo {
    return this.testigosService.obtenerTestigo(Number(id));
  }

  @Post('agregar')
  agregarTestigo(@Body() testigo: Testigo): { success: boolean; mensaje: string } {
    return this.testigosService.agregarTestigo(testigo);
  }

  @Delete('eliminar/:id')
  eliminarTestigo(@Param('id') id: string): { success: boolean; mensaje: string } {
    return this.testigosService.eliminarTestigo(Number(id));
  }

  @Put('modificar/:id')
  modificarTestigo(@Param('id') id: string, @Body() nuevoTestigo: Testigo): { success: boolean; mensaje: string } {
    return this.testigosService.modificarTestigo(Number(id), nuevoTestigo);
  }
  
}
