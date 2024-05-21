import { IsNotEmpty } from "class-validator"

export class CreateCidadeDto {
    id?: number
    
    @IsNotEmpty()
    nome: string
    
    @IsNotEmpty()
    uf: string

    @IsNotEmpty()
    ibge: string    
}
