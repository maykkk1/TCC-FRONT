import { Component, Input } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefas-view-card',
  templateUrl: './tarefas-view-card.component.html',
  styleUrls: ['./tarefas-view-card.component.css']
})
export class TarefasViewCardComponent {
  faEdit = faEdit;
  @Input() tarefa: Tarefa;

  constructor(private router: Router){}


  openTarefa(){
    this.router.navigate(['gerenciador/'+this.tarefa.id]);
  }
}
