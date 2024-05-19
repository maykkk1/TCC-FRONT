import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Projeto } from '../model/projeto.model';
import { RequestResult } from '../shared/requestResult/request-result.model';
import { Subject } from 'rxjs';
import { Tarefa } from '../model/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  projetosChange: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }

  private getUrl(){
    return "http://localhost:5149/projeto";
  }

  save(projeto: Projeto){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.getUrl()}/save`, projeto, { headers });
  }

  getAllById(userId: number){
    var user = this.authService.getUser();
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
    .set('userId', userId)
    
    return this.http.get<RequestResult<Projeto[]>>(this.getUrl(), { headers, params });
  }

  getProjeto(id: number){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('projetoId', id);

    return this.http.get<RequestResult<Projeto>>(`${this.getUrl()}/projeto`, { headers, params });
  }

  saveTarefa(tarefa: Tarefa){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.getUrl()}/tarefa`, tarefa, { headers });
  }

  updateProjeto(projeto: Projeto){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.getUrl()}`, projeto, { headers });
  }
}
