import { Component, Input } from '@angular/core';
import { Atividade } from 'src/app/model/atividade.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { TarefaService } from 'src/app/services/tarefa-service.service';

@Component({
  selector: 'app-atividade-alteracao',
  templateUrl: './atividade-alteracao.component.html',
  styleUrls: ['./atividade-alteracao.component.css']
})
export class AtividadeAlteracaoComponent {
  constructor(private tarefaService: TarefaService, private alunoService: AlunoService){}

  @Input() atividade: Atividade;

  abrirTarefa(tarefaId: number){
    this.alunoService.moveToBoard();
    this.tarefaService.openTarefa(tarefaId);
  }

}
