import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Comentario } from 'src/app/model/comentario.model';
import { Tarefa } from 'src/app/model/tarefa.model';
import { User } from 'src/app/model/user.model';
import { ComentarioTarefaService } from 'src/app/services/comentario-tarefa.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})

export class ComentarioComponent implements OnInit {
  @Input() comentario: Comentario;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  user: User;
  faEllipsis = faEllipsis;

  constructor(private authService: AuthService,
              private messageService: MensagemService,
              private comentarioService: ComentarioTarefaService){}

  ngOnInit(): void {
    this.user = this.authService.getUser()!
  }

  deletar(){
    this.comentarioService.delete(this.comentario.id).subscribe(data => {
      this.onDelete.emit(this.comentario.id);
      this.messageService.ShowMessage("Comentário excluído!", 5000, true)
    }, error => {
      if(error.error.message){
        this.messageService.ShowMessage(error.error.message, 5000, false);
      } else {
        this.messageService.ShowMessage("Ocorreu um erro ao excluir o comentário.", 5000, false);
      }
    });;
  }
}
