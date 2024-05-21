import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne} from "typeorm";
import {Length} from "class-validator"
import { AbstractEntity } from "src/database/abstract.entity";


@Entity()
export class Tamanho extends AbstractEntity<Tamanho> {
    @Column({ unique: true })
    nome: string

    @Column({ unique: true })
    @Length(2, 2)
    referencia: string
}



