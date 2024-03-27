import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(private tarefaService: TarefaService,
              private comentarioService: ComentarioTarefaService,
              @Inject(MAT_DIALOG_DATA) public data: number){}


  ngOnInit(): void {
    this.tarefaService.getTarefaById(this.data).subscribe(tarefaResponse => {
      this.tarefa = tarefaResponse.data;
    })
  }

  comentar($event: string){
    const comentario = new TarefaComentario($event, this.tarefa.id);

    this.comentarioService.save(comentario).subscribe(data => console.log(data));

  }

}
