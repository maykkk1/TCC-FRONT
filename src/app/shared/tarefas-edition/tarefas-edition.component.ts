import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';

@Component({
  selector: 'app-tarefas-edition',
  templateUrl: './tarefas-edition.component.html',
  styleUrls: ['./tarefas-edition.component.css']
})
export class TarefasEditionComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(private tarefaService: TarefaService){}


  ngOnInit(): void {
    this.form = new FormGroup({
      descricao: new FormControl(null)
    });
  }

  salvarTarefa(){
    const tarefa = new Tarefa();
    tarefa.descricao = this.form.value.descricao;
    this.tarefaService.save(tarefa);
  }


  ngOnDestroy(): void {
  }

}
