/* eslint-disable prettier/prettier */
import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text', {
        unique: true
    })
    token: string;

    @Column('bool', {
        default: true
    })
    active: boolean;

    @Column('int', {
        default: 10
    })
    reqLeft: number;


 
}

