import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: 'qwe123', //clave
      signOptions:{expiresIn:'1h'}
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, JwtStrategy],
  exports:[PassportModule, JwtModule]
})
export class UsuarioModule {}
