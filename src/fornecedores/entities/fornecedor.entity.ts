import { Cidade } from "src/cidades/entities/cidade.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fornecedor extends AbstractEntity<Fornecedor> {
    @Column()
    nome: string

    @OneToOne(() => Cidade, {cascade: true})
    @JoinColumn()
    cidade: Cidade
}
