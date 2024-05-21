import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsNumber()
    tenantId: number;

    @IsEmail()
    email: string;

    @IsString()
    nome: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)    
    password: string;
}
