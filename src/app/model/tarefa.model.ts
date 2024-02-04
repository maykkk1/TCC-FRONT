import { SituacaoTarefaEnum } from "../shared/enums/situacaoTarefa.enum";
import { TipoTarefa } from "../shared/enums/tipoTarefa.enum";

export class Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    situacao: SituacaoTarefaEnum;
    tipo: TipoTarefa
    idPessoa: number;
}

