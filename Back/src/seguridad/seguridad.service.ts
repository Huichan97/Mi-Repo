// src/seguridad/seguridad.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeguridadService {
  private readonly saltRounds = 10; // Rondas de sal para el hash
  private readonly filePath = path.join(__dirname, 'pass', 'seguridad.json'); // Ruta del archivo

  constructor() {
    // Verificar si la carpeta existe, si no, crearla
    try {
      const dirPath = path.dirname(this.filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Carpeta creada en: ${dirPath}`);
      } else {
        console.log(`Carpeta ya existe: ${dirPath}`);
      }
    } catch (error) {
      console.error('Error al crear la carpeta:', error);
    }
  }

  // Método para configurar el PIN y almacenarlo en el archivo JSON
  async configurarPin(pin: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(pin, this.saltRounds);
      const data = { pinHash: hash };

      // Guardar el hash en un archivo JSON en la ruta especificada
      fs.writeFileSync(this.filePath, JSON.stringify(data));
      console.log('PIN configurado y guardado correctamente.');

      return 'PIN configurado y guardado en formato hash';
    } catch (error) {
      console.error('Error al guardar el PIN:', error);
      throw new Error('Error al configurar el PIN');
    }
  }

  // Método para configurar la contraseña y almacenarla en el archivo JSON
  async configurarPassword(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, this.saltRounds);
      const data = { passwordHash: hash };

      // Guardar el hash en un archivo JSON en la ruta especificada
      fs.writeFileSync(this.filePath, JSON.stringify(data));
      console.log('Contraseña configurada y guardada correctamente.');

      return 'Contraseña configurada y guardada en formato hash';
    } catch (error) {
      console.error('Error al guardar la contraseña:', error);
      throw new Error('Error al configurar la contraseña');
    }
  }

  // Método para verificar el PIN comparándolo con el hash almacenado en el archivo JSON
  async verificarPin(pin: string): Promise<boolean> {
    try {
      const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      return await bcrypt.compare(pin, data.pinHash);
    } catch (error) {
      console.error('Error al verificar el PIN:', error);
      throw new Error('Error al verificar el PIN');
    }
  }

  // Método para verificar la contraseña comparándola con el hash almacenado en el archivo JSON
  async verificarPassword(password: string): Promise<boolean> {
    try {
      const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      return await bcrypt.compare(password, data.passwordHash);
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      throw new Error('Error al verificar la contraseña');
    }
  }
}
