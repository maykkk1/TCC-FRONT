import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TarefaModalComponent } from 'src/app/shared/tarefa/tarefa-modal/tarefa-modal.component';

@Component({
  selector: 'app-tarefas-view-card',
  templateUrl: './tarefas-view-card.component.html',
  styleUrls: ['./tarefas-view-card.component.css']
})
export class TarefasViewCardComponent {
  faEdit = faEdit;
  @Input() tarefa: Tarefa;

  constructor(private dialog: MatDialog,){}


  openTarefa(){
    this.dialog.open(TarefaModalComponent, {
      width: "500px",
      data: this.tarefa.id
    });
  }
}
