import { DificuldadeTarefaEnum } from "../shared/enums/dificuldadeTarefa.enum";
import { SituacaoTarefaEnum } from "../shared/enums/situacaoTarefa.enum";
import { TipoTarefa } from "../shared/enums/tipoTarefa.enum";
import { Comentario } from "./comentario.model";
import { User } from "./user.model";

export class Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    situacao: SituacaoTarefaEnum;
    tipo: TipoTarefa;
    dificuldade: DificuldadeTarefaEnum;
    pessoaId: number | null;
    projetoId: number;
    createdById: number;
    createdBy: User | null;
    dataFinal: Date;
    dataCriacao: Date;
    comentarios: Comentario[];
}

