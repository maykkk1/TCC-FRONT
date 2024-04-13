import { SituacaoTarefaEnum } from "../shared/enums/situacaoTarefa.enum";
import { TipoAtividade } from "../shared/enums/tipoAtividade.enum";

export class Atividade {
    id: number;
    descricao: string;
    dataAtividade: Date;
    tipoAtiviade: TipoAtividade
    responsavel: string;
    tarefaTitulo: string;
    pessoaId: number;
    tarefaId: number;
    novaSituacaoTarefa: SituacaoTarefaEnum;
}
