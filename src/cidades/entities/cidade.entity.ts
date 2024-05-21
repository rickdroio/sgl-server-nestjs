import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne} from "typeorm";
import {Length} from "class-validator"
import { AbstractEntity } from "src/database/abstract.entity";


@Entity()
@Unique(["nome", "uf"])
export class Cidade extends AbstractEntity<Cidade> {
    @Column()
    nome: string

    @Column()
    @Length(2, 2)
    uf: string

    @Column({ unique: true })
    ibge: string  
}
