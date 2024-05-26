import { TipoPessoaEnum } from "../shared/enums/tipoPessoa.enum";

export class Rank {
    id: number;
    nome: string;
    tipo: TipoPessoaEnum;
    pontoMaximos: number;
    pontosMinimos: number;
}