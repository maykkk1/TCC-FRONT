import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
              private dialogRef: DialogRef<ProjectEditionComponent>
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null),
      descricao: new FormControl(null)
    })
  }

  addProject(){
    this.processing = true;
    this.projetoService.save(this.form.value).subscribe(response => {
      this.messagemService.ShowMessage("Projeto criado com sucesso!", 4000, true)
      this.dialogRef.close();
      this.projetoService.projetosChange.next();
      this.processing = false;
    }, error => {
      this.messagemService.ShowMessage("Error", 4000, false)
      this.processing = false
    })
  }

}
