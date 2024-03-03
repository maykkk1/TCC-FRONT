import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  tarefa: Tarefa;

  constructor(private route: ActivatedRoute,
              private tarefaService: TarefaService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.tarefaService.getTarefaById(id).subscribe(data => {
        this.tarefa = data.data;
      });
    })
  }
}
