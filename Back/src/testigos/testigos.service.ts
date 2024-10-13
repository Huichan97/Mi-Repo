import { Injectable } from '@nestjs/common';
import { Testigo } from './testigo.inteface';

@Injectable()
export class TestigosService {
  private testigos: Testigo[] = [];

  // Método para agregar un nuevo testigo
  agregarTestigo(testigo: Testigo): { success: boolean; mensaje: string } {
    this.testigos.push(testigo);
    return { success: true, mensaje: 'Testigo agregado correctamente' };
  }

  // Método para obtener todos los testigos
  obtenerTestigos(): Testigo[] {
    console.log(this.testigos); // Verifica si los testigos están siendo almacenados
    return this.testigos;
  }

  obtenerTestigo(id: number): Testigo {
    return this.testigos.find(testigo => testigo.id === id);
  }

  eliminarTestigo(id: number): { success: boolean; mensaje: string } {
    const index = this.testigos.findIndex(testigo => testigo.id === id);
    if (index > -1) {
      this.testigos.splice(index, 1);
      return { success: true, mensaje: 'Testigo eliminado correctamente' };
    } else {
      return { success: false, mensaje: 'Testigo no encontrado' };
    }
  }

  modificarTestigo(id: number, nuevoTestigo: Testigo): { success: boolean; mensaje: string } {
    const index = this.testigos.findIndex(testigo => testigo.id === id);
    if (index > -1) {
      // Asegúrate de que solo se actualicen los datos excepto el ID
      this.testigos[index] = { ...this.testigos[index], ...nuevoTestigo };
      return { success: true, mensaje: 'Testigo modificado correctamente' };
    } else {
      return { success: false, mensaje: 'Testigo no encontrado' };
    }
  }  
}
