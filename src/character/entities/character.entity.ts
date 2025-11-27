/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from '../../location/entities/location.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column()
  employee: boolean;

  @OneToOne(() => Location, (location) => location.owner)
  @JoinColumn()
  property: Location;

  @ManyToMany(() => Location, location => location.favCharacters)
  @JoinTable()
  favPlaces: Location[];
  
}