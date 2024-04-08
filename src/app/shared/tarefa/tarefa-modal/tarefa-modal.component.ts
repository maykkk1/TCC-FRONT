import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarefaComentario } from 'src/app/model/tarefa-comentario';
import { Tarefa } from 'src/app/model/tarefa.model';
import { ComentarioTarefaService } from 'src/app/services/comentario-tarefa.service';
import { TarefaService } from 'src/app/services/tarefa-service.service';

@Component({
  selector: 'app-tarefa-modal',
  templateUrl: './tarefa-modal.component.html',
  styleUrls: ['./tarefa-modal.component.css']
})
export class TarefaModalComponent implements OnInit {
  tarefa: Tarefa;
  comentariosIsOpen: boolean = false;

  constructor(private tarefaService: TarefaService,
              private comentarioService: ComentarioTarefaService,
              private dialogRef: DialogRef<TarefaModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {tarefaId: number, comentarioOpen: boolean}){}


  ngOnInit(): void {
    this.tarefaService.getTarefaById(this.data.tarefaId).subscribe(tarefaResponse => {
      this.tarefa = tarefaResponse.data;
    })
    this.comentariosIsOpen = this.data.comentarioOpen;
  }

  openComentarios(){
    this.comentariosIsOpen = !this.comentariosIsOpen;
  }

  comentar($event: string){
    const comentario = new TarefaComentario($event, this.tarefa.id);
    this.comentarioService.save(comentario).subscribe(data => this.tarefa.comentarios.unshift(data));
    this.comentariosIsOpen = true;
    setTimeout(() => {
      this.tarefaService.taskChange.next();
    }, 500);
  }

  cancelar(){
    this.dialogRef.close()
  }

  onDeleteComentario($event: number){
    const index = this.tarefa.comentarios.findIndex(c => c.id === $event);
    if (index !== -1) {
      this.tarefa.comentarios.splice(index, 1);
      setTimeout(() => {
        this.tarefaService.taskChange.next();
      }, 500);
    }
  }
}
