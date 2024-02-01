import { SituacaoTarefaEnum } from "../shared/enums/situacaoTarefa.enum";

export class Tarefa {
    id: number;
    descricao: string;
    situacao: SituacaoTarefaEnum;
    idPessoa: number;
}

