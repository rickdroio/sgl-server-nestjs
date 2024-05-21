import { IsNotEmpty } from "class-validator"

export class CreateCoreDto {
    id?: number
    
    @IsNotEmpty()
    nome: string
    
    @IsNotEmpty()
    sigla: string

    code: string 
}
