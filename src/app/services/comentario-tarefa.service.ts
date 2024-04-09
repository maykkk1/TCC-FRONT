import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TarefaComentario } from '../model/tarefa-comentario';
import { Comentario } from '../model/comentario.model';
import { RequestResult } from '../shared/requestResult/request-result.model';
import { MensagemService } from './mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioTarefaService {

  constructor(private authService: AuthService,
              private messageService: MensagemService,
              private http: HttpClient) { }

  private getUrl(){
    return "http://localhost:5149/tarefaComentario";
  }

  save(cometario: TarefaComentario){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Comentario>(`${this.getUrl()}/save`, cometario, { headers });
  }

  delete(comentarioId: number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
    .set('id', comentarioId)
    
    return this.http.delete<RequestResult<number[]>>(this.getUrl(), { headers, params });
  }
}
