import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa.model';
import { faEdit, faEllipsis, faMessage, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TarefaModalComponent } from 'src/app/shared/tarefa/tarefa-modal/tarefa-modal.component';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { DificuldadeTarefaEnum } from 'src/app/shared/enums/dificuldadeTarefa.enum';

@Component({
  selector: 'app-tarefas-view-card',
  templateUrl: './tarefas-view-card.component.html',
  styleUrls: ['./tarefas-view-card.component.css']
})
export class TarefasViewCardComponent {
  faEdit = faEdit;
  faMessage = faMessage;
  faEllipsis = faEllipsis;
  faStar = faStar;
  @Input() tarefa: Tarefa;

  constructor(private dialog: MatDialog,
              private tarefaService: TarefaService,
              private messageService: MensagemService){}

  openTarefa(commentOpen: boolean){
    this.dialog.open(TarefaModalComponent, {
      maxWidth: "650px",
      width: "100%",
      data: { tarefaId: this.tarefa.id, comentarioOpen: commentOpen }
    });
  }

  deletar(){
    this.tarefaService.delete(this.tarefa.id).subscribe(data => {
      this.messageService.ShowMessage("Tarefa excluída com sucesso!", 5000, true)
      this.tarefaService.taskChange.next();
    }, error => {
      if(error.error.message){
        this.messageService.ShowMessage(error.error.message, 5000, false);
      } else {
        this.messageService.ShowMessage("Ocorreu um erro ao excluir a tarefa.", 5000, false);
      }
    });;
  }

  createRange(number: number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
