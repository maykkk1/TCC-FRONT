import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Projeto } from 'src/app/model/projeto.model';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ProjetoService } from 'src/app/services/projeto.service';

@Component({
  selector: 'app-project-edition',
  templateUrl: './project-edition.component.html',
  styleUrls: ['./project-edition.component.css']
})
export class ProjectEditionComponent implements OnInit {
  form: FormGroup;
  processing: boolean = false;


  constructor(private projetoService: ProjetoService,
              private messagemService: MensagemService,
              @Inject(MAT_DIALOG_DATA) public data: { edition: boolean, project: Projeto },
              private dialogRef: DialogRef<ProjectEditionComponent>
  ){}

  ngOnInit(): void {
    if(this.data.edition){
      this.form = new FormGroup({
        titulo: new FormControl(this.data.project.titulo),
        descricao: new FormControl(this.data.project.descricao)
      })
    } else {
      this.form = new FormGroup({
        titulo: new FormControl(null),
        descricao: new FormControl(null)
      })
    }
  }

  save(){
    this.data.edition 
    ? this.updateProject()
    : this.addProject()
  }

  addProject(){
    this.processing = true;
    this.projetoService.save(this.form.value).subscribe(response => {
      this.messagemService.ShowMessage("Projeto criado com sucesso!", 4000, true)
      this.dialogRef.close();
      this.projetoService.projetosChange.next();
      this.processing = false;
    }, error => {
      this.messagemService.showErrorModal(error.error);
      this.processing = false
    })
  }

  updateProject(){
    const projeto = { ... this.data.project };
    projeto.titulo = this.form.get("titulo")?.value;
    projeto.descricao = this.form.get("descricao")?.value;
    this.projetoService.updateProjeto(projeto).subscribe(response => {
      this.messagemService.ShowMessage("Projeto editado com sucesso!", 4000, true)
      this.data.project.titulo = projeto.titulo;
      this.data.project.descricao = projeto.descricao;
      this.dialogRef.close();
      this.projetoService.projetosChange.next();
    }, error => {
      this.messagemService.showErrorModal(error.error)
    });
  }

}
