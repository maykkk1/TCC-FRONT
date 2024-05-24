import { Atividade } from "./atividade.model";

export class Projeto {
    id: number;
    titulo: string;
    descricao: string;
    dataCriacao: Date;
    atividades: Atividade[];
}