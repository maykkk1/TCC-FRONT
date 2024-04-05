import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comentario } from 'src/app/model/comentario.model';
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

  @Output() comentarioEmitter: EventEmitter<Comentario> = new EventEmitter<Comentario>();

  constructor(private tarefaService: TarefaService,
              private comentarioService: ComentarioTarefaService,
              private dialogRef: DialogRef<TarefaModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number){}


  ngOnInit(): void {
    this.tarefaService.getTarefaById(this.data).subscribe(tarefaResponse => {
      this.tarefa = tarefaResponse.data;
    })
  }

  openComentarios(){
    this.comentariosIsOpen = !this.comentariosIsOpen;
  }

  comentar($event: string){
    const comentario = new TarefaComentario($event, this.tarefa.id);
    this.comentarioService.save(comentario).subscribe(data => this.comentarioEmitter.emit(comentario));
  }

  cancelar(){
    this.dialogRef.close()
  }

}
