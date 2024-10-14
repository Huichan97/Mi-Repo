import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testigo } from './testigo.entity';

@Injectable()
export class TestigosService {
  constructor(
    @InjectRepository(Testigo)
    private readonly testigoRepository: Repository<Testigo>,
  ) {}

  async agregarTestigo(testigo: Testigo): Promise<{ success: boolean; mensaje: string }> {
    await this.testigoRepository.save(testigo);
    return { success: true, mensaje: 'Testigo agregado correctamente' };
  }

  async obtenerTestigos(): Promise<Testigo[]> {
    return this.testigoRepository.find();
  }

  async obtenerTestigo(id: number): Promise<Testigo> {
    return this.testigoRepository.findOneBy({ id });
  }

  async eliminarTestigo(id: number): Promise<{ success: boolean; mensaje: string }> {
    const resultado = await this.testigoRepository.delete(id);
    if (resultado.affected) {
      return { success: true, mensaje: 'Testigo eliminado correctamente' };
    } else {
      return { success: false, mensaje: 'Testigo no encontrado' };
    }
  }

  async modificarTestigo(id: number, nuevoTestigo: Partial<Testigo>): Promise<{ success: boolean; mensaje: string }> {
    const resultado = await this.testigoRepository.update(id, nuevoTestigo);
    if (resultado.affected) {
      return { success: true, mensaje: 'Testigo modificado correctamente' };
    } else {
      return { success: false, mensaje: 'Testigo no encontrado' };
    }
  }
}
