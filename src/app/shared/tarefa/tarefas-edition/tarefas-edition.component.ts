import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { TipoTarefa } from '../../enums/tipoTarefa.enum';
import { SituacaoTarefaEnum } from '../../enums/situacaoTarefa.enum';
import { DialogRef } from '@angular/cdk/dialog';
import { MensagemService } from 'src/app/services/mensagem.service';
import { AtividadesService } from 'src/app/services/atividades.service';

@Component({
  selector: 'app-tarefas-edition',
  templateUrl: './tarefas-edition.component.html',
  styleUrls: ['./tarefas-edition.component.css']
})
export class TarefasEditionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  error: boolean = false;
  processing: boolean = false;

  constructor(private tarefaService: TarefaService,
               @Inject(MAT_DIALOG_DATA) public data: tarefasEditionData,
               private dialogRef: DialogRef<TarefasEditionComponent>,
               private mensagem: MensagemService,
               private atividadeService: AtividadesService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
      dataFinal: new FormControl(null)
    });
  }

  salvarTarefa(){
    this.processing = true;
    const tarefa = new Tarefa();
    tarefa.titulo = this.form.get('titulo')?.value;
    tarefa.descricao = this.form.get('descricao')?.value;
    tarefa.dataFinal = this.form.get('dataFinal')?.value;
    tarefa.tipo = this.data.isPrincipal ? TipoTarefa.Principal : TipoTarefa.Secundaria;
    tarefa.pessoaId = this.data.destinatarioId;
    tarefa.createdById = this.data.criadorId;
    tarefa.situacao = SituacaoTarefaEnum.Pendente;

    if(!this.form.get('descricao')?.valid || !this.form.get('titulo')?.valid){
      this.form.markAllAsTouched();
      this.error = true;
      this.mensagem.ShowMessage("Ocorreu um erro ao criar a tarefa!", 3000, false)
      this.processing = false;
      return;
    }

    if(this.data.isPrincipal){
      this.tarefaService.savePrincipal(tarefa).subscribe(response => {
        this.mensagem.ShowMessage("Tarefa criada com sucesso!", 3000, true)
        this.processing = false;
        this.tarefaService.taskChange.next();
        this.atividadeService.atividadeChange.next();
        this.dialogRef.close();
      }, Error => {
        this.error = true;
        this.mensagem.ShowMessage("Ocorreu um erro ao criar a tarefa!", 3000, false)
        this.processing = false;
      });
    } else {
      this.tarefaService.save(tarefa).subscribe(response => {
        this.mensagem.ShowMessage("Tarefa criada com sucesso!", 3000, true)
        this.processing = false;
        this.tarefaService.taskChange.next();
        this.atividadeService.atividadeChange.next();
        this.dialogRef.close();
      }, Error => {
        this.error = true;
        this.mensagem.ShowMessage("Ocorreu um erro ao criar a tarefa!", 3000, false)
        this.processing = false;
      });
    }
  }

  resetForm(){
    this.form.reset();
  }


  ngOnDestroy(): void {
  }

}

export interface tarefasEditionData {
  isPrincipal: boolean;
  criadorId: number;
  destinatarioId: number;
}
