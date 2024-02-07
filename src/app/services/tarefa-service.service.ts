import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { SituacaoTarefaEnum } from '../shared/enums/situacaoTarefa.enum';
import { TipoTarefa } from '../shared/enums/tipoTarefa.enum';
import { MensagemService } from './mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private mensagemService: MensagemService) { }

  private getUrl(){
    return "http://localhost:5149/tarefas";
  }

  // validar erro
  save(tarefa: Tarefa){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const user: User | undefined = this.authService.getUser();
    if(user){
      tarefa.idPessoa = user.id;
      tarefa.createdById = user.id;
    }
    tarefa.situacao = SituacaoTarefaEnum.Pendente;
    tarefa.titulo = "teste";
    tarefa.situacao = SituacaoTarefaEnum.Pendente;
    this.http.post<any>(`${this.getUrl()}/save`, tarefa, { headers }).subscribe(data => {
      this.mensagemService.ShowMessage("Tarefa criada com sucesso!", 3000, true);
    });
  }

  savePrincipal(tarefa: Tarefa){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const user: User | undefined = this.authService.getUser();
    if(user){
      tarefa.createdById = user.id;
    }

    this.http.post<any>(`${this.getUrl()}/save-principal`, tarefa, { headers }).subscribe(data => {
      this.mensagemService.ShowMessage("Tarefa criada com sucesso!", 3000, true);
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
