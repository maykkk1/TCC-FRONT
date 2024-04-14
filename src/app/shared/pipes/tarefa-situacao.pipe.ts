import { Pipe, PipeTransform } from '@angular/core';
import { SituacaoTarefaEnum } from '../enums/situacaoTarefa.enum';

@Pipe({
  name: 'tarefaSituacao'
})
export class TarefaSituacaoPipe implements PipeTransform {

  transform(situacao: number) {
    switch (situacao) {
      case 0:
        return 'Pendente';
      case 1:
        return 'Fazendo';
      case 2:
        return 'Análise';
      case 3:
        return 'Concluída';
      default:
        return 'Retorno';
    }
  }

}
