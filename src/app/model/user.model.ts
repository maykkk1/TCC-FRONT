import { TipoPessoaEnum } from "../shared/enums/tipoPessoa.enum";
import { Rank } from "./rank.model";

export class User {
    id: number;
    name: string;
    email: string;
    tipo: TipoPessoaEnum;
    password: string;
    rank: Rank;

    constructor(name: string, email: string, tipo: TipoPessoaEnum, password: string) {
        this.name = name;
        this.email = email;
        this.tipo = tipo;
        this.password = password;
      }
}

export class CadastroUser {
  name: string;
  sobrenome: string;
  email: string;
  tipo: TipoPessoaEnum;
  password: string;
  confirm: string;
  orientadorId: any;
  codigoCadastro: any;
}
