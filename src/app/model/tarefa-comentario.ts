export class TarefaComentario {
    id: number;
    conteudo: string;
    idTarefa: number;


    constructor(conteudo: string, idTarefa: number) {
        this.conteudo = conteudo;
        this.idTarefa = idTarefa;
    }
}