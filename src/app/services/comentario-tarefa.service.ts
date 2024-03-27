import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TarefaComentario } from '../model/tarefa-comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioTarefaService {

  constructor(private authService: AuthService,
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
    return this.http.post<any>(`${this.getUrl()}/save`, cometario, { headers });
  }
}
