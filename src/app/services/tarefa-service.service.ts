import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { SituacaoTarefaEnum } from '../shared/enums/situacaoTarefa.enum';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  private getUrl(){
    return "http://localhost:5149/tarefas";
  }

  save(tarefa: Tarefa){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const user: User = this.authService.getUser();
    tarefa.idPessoa = user.id;
    tarefa.situacao = SituacaoTarefaEnum.Pendente;
    this.http.post<any>(`${this.getUrl()}/save`, tarefa, { headers }).subscribe(data => {
      console.log(data);
    });
  }

}
