import { CreateCidadeDto } from "src/cidades/dto/create-cidade.dto";

export class CreateFornecedoreDto {
    nome: string;
    cidade: CreateCidadeDto;
}
