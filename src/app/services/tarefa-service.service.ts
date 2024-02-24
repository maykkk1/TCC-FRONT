import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { SituacaoTarefaEnum } from '../shared/enums/situacaoTarefa.enum';
import { TipoTarefa } from '../shared/enums/tipoTarefa.enum';
import { MensagemService } from './mensagem.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  taskChange: Subject<void> = new Subject();

  constructor(private http: HttpClient,
              private authService: AuthService,
              private mensagemService: MensagemService) { }

  private getUrl(){
    return "http://localhost:5149/tarefas";
  }

  save(tarefa: Tarefa){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.getUrl()}/save`, tarefa, { headers });
  }

  savePrincipal(tarefa: Tarefa){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.getUrl()}/save-principal`, tarefa, { headers });
  }

  update(tarefa: Tarefa){
    const token = this.authService.getToken();
    const tarefaCopy = {...tarefa}
    tarefaCopy.createdBy = null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.getUrl()}`, tarefaCopy, { headers });
  }

  getTarefas(isPrincipal: Boolean = false){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('isPrincipal', isPrincipal.toString());

    return this.http.get<Tarefa[]>(this.getUrl(), { headers, params });
  }

  getTarefaById(id: number){
    const token = this.authService.getToken();
    console.log(id)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.getUrl()}/tarefa`, id, { headers });
  }

}
