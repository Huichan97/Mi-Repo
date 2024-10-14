import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Testigo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  circuloCercano: string;

  @Column()
  telefono: string;

  @Column()
  correo: string;
}
