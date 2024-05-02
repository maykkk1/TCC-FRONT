import { TipoPessoaEnum } from "../shared/enums/tipoPessoa.enum";

export class User {
    id: number;
    name: string;
    email: string;
    tipo: TipoPessoaEnum;
    password: string;

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
