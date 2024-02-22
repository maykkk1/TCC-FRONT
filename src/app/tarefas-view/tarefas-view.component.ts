import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TarefaService } from '../services/tarefa-service.service';
import { Tarefa } from '../model/tarefa.model';
import { SituacaoTarefaEnum } from '../shared/enums/situacaoTarefa.enum';
import { MensagemService } from '../services/mensagem.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-tarefas-view',
  templateUrl: './tarefas-view.component.html',
  styleUrls: ['./tarefas-view.component.css']
})
export class TarefasViewComponent implements OnInit, OnDestroy {
  task$Sub: Subscription;

  pendente: Tarefa[] = [];

  fazendo: Tarefa[] = [];

  analise: Tarefa[] = [];

  concluida: Tarefa[] = [];

  @Input() isPrincipal: boolean = false;

  constructor(private tarefaSerice: TarefaService,
              private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.tarefaSerice.getTarefas(this.isPrincipal).subscribe(data => {
      this.filtrarTarefas(data);
    });

    this.task$Sub = this.tarefaSerice.taskChange.pipe(
      switchMap(() => this.tarefaSerice.getTarefas(this.isPrincipal))
    ).subscribe(data => {
      this.filtrarTarefas(data);
    })
  }


  ngOnDestroy(): void {
    this.task$Sub.unsubscribe();
  }


  drop(event: CdkDragDrop<Tarefa[]>) {
    const previousContainerIdx = event.previousContainer.id.replace(/\D/g, '');
    let newSituacao = parseInt(event.container.id.replace(/\D/g, ''));

    if(newSituacao == 3 && this.isPrincipal && !(event.previousContainer === event.container)){
      this.mensagemService.ShowMessage("Apenas o orientador pode concluir tarefas principais.", 10000, false)
      return;
    } else if (newSituacao == 2 && this.isPrincipal && !(event.previousContainer === event.container)) {
      this.mensagemService.ShowMessage("O orientador irá analisar e concluir a sua tarefa em breve.", 10000, true)
    }

    let tarefa: Tarefa;

    if(!(event.previousContainer === event.container)){
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
  
      this.tarefaSerice.update(tarefa).subscribe(data => { 
      }, error => {
        this.mensagemService.ShowMessage(error.error, 5000, false)
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
        } else {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex,
          );
        }
      });
    }

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
