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
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const user: User = this.authService.getUser();
    tarefa.idPessoa = user.id;
    tarefa.situacao = SituacaoTarefaEnum.Pendente;
    this.http.post<any>(`${this.getUrl()}/save`, tarefa, { headers }).subscribe(data => {
      // plotar mensagem
      console.log(data);
    });
  }

  update(tarefa: Tarefa){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.put<any>(`${this.getUrl()}`, tarefa, { headers }).subscribe(data => {
      // plotar mensagem
    });
  }

  getTarefas(){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    return this.http.get<Tarefa[]>(this.getUrl(), { headers });
  }

}
