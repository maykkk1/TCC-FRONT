import { Component, Input, OnInit } from '@angular/core';
import { Atividade } from 'src/app/model/atividade.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { TipoAtividade } from '../../enums/tipoAtividade.enum';
import { SituacaoTarefaEnum } from '../../enums/situacaoTarefa.enum';

@Component({
  selector: 'app-atividade-alteracao',
  templateUrl: './atividade-alteracao.component.html',
  styleUrls: ['./atividade-alteracao.component.css']
})
export class AtividadeAlteracaoComponent implements OnInit {
  borderColor: string = 'red';

  constructor(private tarefaService: TarefaService, private alunoService: AlunoService){}

  @Input() atividade: Atividade;

  ngOnInit(): void {
    this.getBorderColor();
  }

  abrirTarefa(tarefaId: number){
    this.alunoService.moveToBoard();
    this.tarefaService.openTarefa(tarefaId);
  }

  getBorderColor(){

    if(this.atividade.tipo == TipoAtividade.AlteracaoTarefa){
      if(this.atividade.novaSituacaoTarefa != SituacaoTarefaEnum.Retorno){
        return this.borderColor = '#7230e4';
      }
      return this.borderColor = '#ED4337';
    }

    if(this.atividade.tipo == TipoAtividade.ExclusaoTarefa)
      return this.borderColor = '#ED4337';

    if(this.atividade.tipo == TipoAtividade.CriacaoTarefa)
      return this.borderColor = '#00d062';

    return this.borderColor = '#7230e4';
  }
}
