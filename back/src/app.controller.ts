import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'Hola, mundo desde la raíz';
  }

  @Get('hello')
  getHello(): string {
    return 'Hola, mundo desde el backend';
  }
}
