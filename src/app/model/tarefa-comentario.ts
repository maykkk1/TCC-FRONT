export class TarefaComentario {
    id: number;
    conteudo: string;
    tarefaId: number;


    constructor(conteudo: string, idTarefa: number) {
        this.conteudo = conteudo;
        this.tarefaId = idTarefa;
    }
}