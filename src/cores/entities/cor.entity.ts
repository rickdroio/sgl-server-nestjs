import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne} from "typeorm";
import {Length} from "class-validator"
import { AbstractEntity } from "src/database/abstract.entity";


@Entity()
export class Cor extends AbstractEntity<Cor> {
    @Column({ unique: true })
    nome: string

    @Column({ unique: true })
    @Length(2, 2)
    sigla: string

    @Column({ nullable: true })
    code: string
}
