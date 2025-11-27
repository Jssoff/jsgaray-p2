/* eslint-disable prettier/prettier */
import { Character } from 'src/character/entities/character.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  cost: number;

  @OneToOne(() => Character, character => character.property)
  owner: Character;

  @ManyToMany(() => Character, character => character.favPlaces)
  favCharacters: Character[];

}

