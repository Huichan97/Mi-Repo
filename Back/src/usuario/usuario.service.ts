// src/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(private readonly jwtService: JwtService) {}

  private usuarios = [
    { id: 1, usuario: 'admin', contrasena: '12345', correo: '', telefono: '' },
    { id: 2, usuario: 'user', contrasena: 'password', correo: '', telefono: '' },
  ];

  private bitacoraAccesos = [];

  login(usuario: string, contrasena: string): any {
    console.log('datos recibidos: ', usuario, contrasena)
    const usuarioEncontrado = this.usuarios.find(
      (u) => u.usuario === usuario && u.contrasena === contrasena,
    );

    const acceso = { usuario, fecha: new Date().toISOString(), exito: false };
    if (usuarioEncontrado) {
      const token = this.jwtService.sign({ usuario: usuarioEncontrado.usuario });
      acceso.exito = true;
      this.bitacoraAccesos.push(acceso); // Registrar el intento exitoso
      return { success: true, token, mensaje: 'Sesión iniciada' };
    } else {
      this.bitacoraAccesos.push(acceso); // Registrar el intento fallido
      return { success: false, mensaje: 'Credenciales incorrectas' };
    }
  }

  obtenerBitacoraAccesos(): any {
    return this.bitacoraAccesos; // Devuelve la lista de intentos de acceso
  }
}
