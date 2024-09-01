import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Integrante } from 'src/app/model/integrante.model';
import { ProjetoPessoaRelacionamento } from 'src/app/model/projeto-pessoa-relacionamento.model';
import { ProjetoService } from 'src/app/services/projeto.service';
import { StatusEnum } from '../enums/status.enum';

@Component({
  selector: 'app-add-aluno-modal',
  templateUrl: './add-aluno-modal.component.html',
  styleUrls: ['./add-aluno-modal.component.css']
})
export class AddAlunoModalComponent implements OnInit {
  alunos: Integrante[] = [];

  constructor(private dialogRef: DialogRef<AddAlunoModalComponent>,
              private projetoService: ProjetoService,
              @Inject(MAT_DIALOG_DATA) public data: { projetoId: number }){}


  ngOnInit(): void {
    this.projetoService.getAllIntegrantes(this.data.projetoId).subscribe(alunos => {
      this.alunos = alunos.data;
    })
  }

  relacionamentoHanlder(index: number){
    const aluno = this.alunos[index]
    const relacionamento = new ProjetoPessoaRelacionamento(this.data.projetoId, aluno.id)
    this.projetoService.addIntegrante(relacionamento).subscribe(data => {
      aluno.status = data 
      ? StatusEnum.Ativo
      : StatusEnum.Inativo
    });
  }

}
