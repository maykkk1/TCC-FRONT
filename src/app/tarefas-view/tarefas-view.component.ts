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
        this.pendente[event.currentIndex].situacao = newSituacao;
        tarefa = this.pendente[event.currentIndex];
        break;
      case "1":
        this.fazendo[event.currentIndex].situacao = newSituacao;
        tarefa = this.fazendo[event.currentIndex];
        break;
      case "2":
        this.analise[event.currentIndex].situacao = newSituacao;
        tarefa = this.analise[event.currentIndex];
        break;
      default:
        this.concluida[event.currentIndex].situacao = newSituacao;
        tarefa = this.concluida[event.currentIndex];
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

    console.log(this.fazendo)
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
