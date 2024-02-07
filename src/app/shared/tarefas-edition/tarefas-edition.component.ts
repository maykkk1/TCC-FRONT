import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { TipoTarefa } from '../enums/tipoTarefa.enum';
import { SituacaoTarefaEnum } from '../enums/situacaoTarefa.enum';

@Component({
  selector: 'app-tarefas-edition',
  templateUrl: './tarefas-edition.component.html',
  styleUrls: ['./tarefas-edition.component.css']
})
export class TarefasEditionComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(private tarefaService: TarefaService,
               @Inject(MAT_DIALOG_DATA) public data: tarefasEditionData){}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
      dataFinal: new FormControl(null)
    });
  }

  salvarTarefa(){
    const tarefa = new Tarefa();
    tarefa.titulo = this.form.get('titulo')?.value;
    tarefa.descricao = this.form.get('descricao')?.value;
    tarefa.dataFinal = this.form.get('dataFinal')?.value;
    tarefa.tipo = this.data.isPrincipal ? TipoTarefa.Principal : TipoTarefa.Secundaria;
    tarefa.idPessoa = this.data.destinatarioId;
    tarefa.createdById = this.data.criadorId;
    tarefa.situacao = SituacaoTarefaEnum.Pendente;

    console.log(tarefa)



    if(this.data.isPrincipal){
      return this.tarefaService.save(tarefa);
    }
    return this.tarefaService.savePrincipal(tarefa);
  }


  ngOnDestroy(): void {
  }

}

export interface tarefasEditionData {
  isPrincipal: boolean;
  criadorId: number;
  destinatarioId: number;
}
