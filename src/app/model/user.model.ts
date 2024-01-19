import { TipoPessoaEnum } from "../shared/enums/tipoPessoa.enum";

export class User {
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
