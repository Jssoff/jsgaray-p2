import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  city: string;
}

