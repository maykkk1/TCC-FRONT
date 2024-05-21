export class ProjetoPessoaRelacionamento {
    projetoId: number;
    pessoaId: number;

    constructor(projetoId: number, pessoaId: number) {
        this.projetoId = projetoId;
        this.pessoaId = pessoaId;
    }
}