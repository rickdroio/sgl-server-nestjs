import { IsEmail } from "class-validator"
import { AbstractEntity } from "src/database/abstract.entity"
import { Column, Entity } from "typeorm"

@Entity()
export class Usuario extends AbstractEntity<Usuario> {
    @Column()
    nome: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;
}