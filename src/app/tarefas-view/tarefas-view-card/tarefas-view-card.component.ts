import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa.model';
import { faEdit, faMessage } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TarefaModalComponent } from 'src/app/shared/tarefa/tarefa-modal/tarefa-modal.component';

@Component({
  selector: 'app-tarefas-view-card',
  templateUrl: './tarefas-view-card.component.html',
  styleUrls: ['./tarefas-view-card.component.css']
})
export class TarefasViewCardComponent {
  faEdit = faEdit;
  faMessage = faMessage;
  @Input() tarefa: Tarefa;

  constructor(private dialog: MatDialog,){}


  openTarefa(commentOpen: boolean){
    this.dialog.open(TarefaModalComponent, {
      maxWidth: "650px",
      width: "100%",
      data: { tarefaId: this.tarefa.id, comentarioOpen: commentOpen }
    });
  }
}
