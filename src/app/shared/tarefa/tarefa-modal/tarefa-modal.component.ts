import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';

@Component({
  selector: 'app-tarefa-modal',
  templateUrl: './tarefa-modal.component.html',
  styleUrls: ['./tarefa-modal.component.css']
})
export class TarefaModalComponent implements OnInit {
  tarefa: Tarefa;

  constructor(private tarefaService: TarefaService,
              @Inject(MAT_DIALOG_DATA) public data: number){}


  ngOnInit(): void {
    this.tarefaService.getTarefaById(this.data).subscribe(tarefaResponse => {
      this.tarefa = tarefaResponse.data;
    })
  }

}
