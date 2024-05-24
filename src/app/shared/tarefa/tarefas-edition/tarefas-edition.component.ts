import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { SituacaoTarefaEnum } from '../../enums/situacaoTarefa.enum';
import { DialogRef } from '@angular/cdk/dialog';
import { MensagemService } from 'src/app/services/mensagem.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DificuldadeTarefaEnum } from '../../enums/dificuldadeTarefa.enum';

@Component({
  selector: 'app-tarefas-edition',
  templateUrl: './tarefas-edition.component.html',
  styleUrls: ['./tarefas-edition.component.css']
})
export class TarefasEditionComponent implements OnInit, OnDestroy {
  faStar = faStar;
  dificuldade:number[] = [0];

  form: FormGroup;
  error: boolean = false;
  processing: boolean = false;

  constructor(private tarefaService: TarefaService,
              private projetoService: ProjetoService,
               @Inject(MAT_DIALOG_DATA) public data: tarefasEditionData,
               private dialogRef: DialogRef<TarefasEditionComponent>,
               private mensagem: MensagemService,
               private atividadeService: AtividadesService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
      dataFinal: new FormControl(null),
      dificuldade: new FormControl(0)
    });
  }

  salvarTarefa(){
    this.processing = true;
    const tarefa = new Tarefa();
    tarefa.titulo = this.form.get('titulo')?.value;
    tarefa.descricao = this.form.get('descricao')?.value;
    tarefa.dataFinal = this.form.get('dataFinal')?.value;
    tarefa.createdById = this.data.criadorId;
    tarefa.situacao = SituacaoTarefaEnum.Pendente;
    tarefa.dificuldade = this.form.get('dificuldade')?.value;

    if(!this.form.get('descricao')?.valid || !this.form.get('titulo')?.valid){
      this.form.markAllAsTouched();
      this.error = true;
      this.mensagem.ShowMessage("Ocorreu um erro ao criar a tarefa!", 3000, false)
      this.processing = false;
      return;
    }

    if(this.data.isProjeto){
      tarefa.pessoaId = null;
      tarefa.projetoId = this.data.destinatarioId;
      this.projetoService.saveTarefa(tarefa).subscribe(response => {
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
      tarefa.pessoaId = this.data.destinatarioId;
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

  dificuldadeChange(event: any){
    const outroArray =  [];
    for (let i = 0; i < event + 1; i++) {
      outroArray.push(i);
    }
    this.dificuldade = [...outroArray];
  }

  formatLabel(value: number): string {
    switch (value) {
      case DificuldadeTarefaEnum.Facil:
        return 'Fácil';
      case DificuldadeTarefaEnum.Normal:
        return 'Normal';
      case DificuldadeTarefaEnum.Dificil:
        return 'Difícil';
      case DificuldadeTarefaEnum.Lendaria:
        return 'Lendária';
      default:
        return `${value}`;
    }
  }

}

export interface tarefasEditionData {
  isProjeto: boolean;
  criadorId: number;
  destinatarioId: number;
}
