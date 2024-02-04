import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TarefaService } from '../services/tarefa-service.service';
import { Tarefa } from '../model/tarefa.model';
import { SituacaoTarefaEnum } from '../shared/enums/situacaoTarefa.enum';

@Component({
  selector: 'app-tarefas-view',
  templateUrl: './tarefas-view.component.html',
  styleUrls: ['./tarefas-view.component.css']
})
export class TarefasViewComponent implements OnInit, OnDestroy {

  pendente: Tarefa[] = [];

  fazendo: Tarefa[] = [];

  analise: Tarefa[] = [];

  concluida: Tarefa[] = [];

  constructor(private tarefaSerice: TarefaService) { }

  ngOnInit(): void {
    this.tarefaSerice.getTarefas().subscribe(data => {
      this.filtrarTarefas(data);
    });
  }
  ngOnDestroy(): void {
  }


  drop(event: CdkDragDrop<Tarefa[]>) {
    const previousContainerIdx = event.previousContainer.id.replace(/\D/g, '');
    const newSituacao = parseInt(event.container.id.replace(/\D/g, ''));
    let tarefa: Tarefa;

    switch (previousContainerIdx) {
      case "0":
        this.pendente[event.previousIndex].situacao = newSituacao;
        tarefa = this.pendente[event.previousIndex];
        break;
      case "1":
        this.fazendo[event.previousIndex].situacao = newSituacao;
        tarefa = this.fazendo[event.previousIndex];
        break;
      case "2":
        this.analise[event.previousIndex].situacao = newSituacao;
        tarefa = this.analise[event.previousIndex];
        break;
      default:
        this.concluida[event.previousIndex].situacao = newSituacao;
        tarefa = this.concluida[event.previousIndex];
        break;
    }

    this.tarefaSerice.update(tarefa);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  filtrarTarefas(data: Tarefa[]) {
    this.pendente = data.filter(t => t.situacao == SituacaoTarefaEnum.Pendente);
    this.fazendo = data.filter(t => t.situacao == SituacaoTarefaEnum.Fazendo);
    this.analise = data.filter(t => t.situacao == SituacaoTarefaEnum.Analise);
    this.concluida = data.filter(t => t.situacao == SituacaoTarefaEnum.Concluida);
  }

  setTarefaSituacao() {

  }

}
