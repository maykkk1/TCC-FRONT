export class TarefaComentario {
    id: number;
    conteudo: string;
    tarefaId: number;
    autorNome: string;
    autorId: number;
    dataComentario: Date;


    constructor(conteudo: string, idTarefa: number) {
        this.conteudo = conteudo;
        this.tarefaId = idTarefa;
    }
}