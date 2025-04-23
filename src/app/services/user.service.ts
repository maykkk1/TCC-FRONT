import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { RequestResult } from '../shared/requestResult/request-result.model';
import { CodigoCadastro } from '../model/codigo-cadastro.model';
import { Conquista } from '../model/conquista.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  private getUrl(){
  return "http://localhost:5149/user";
  }

  getOrientandos(){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User[]>(`${this.getUrl()}/orientandos`, { headers });
  }

  getAluno(id: number){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('id', id);

    return this.http.get<User>(`${this.getUrl()}/aluno`, { headers, params });
  }

  gerarCodigoCadastro(){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RequestResult<number>>(`${this.getUrl()}/codigo`, { headers });
  }

  validarCodigoCadastro(codigo: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
    .set('codigo', codigo);

    // verificar pq o request não funciona
    return this.http.get<CodigoCadastro>(`${this.getUrl()}/validar`, { headers, params });
  }

  getConquistas(userId: number){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RequestResult<any>>(`${this.getUrl()}/conquistas`, {
      headers,
      params: { userId: userId.toString() }
    });
  }


  saveLink(titulo: string, url: string){
    const token = this.authService.getAdmToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.getUrl()}/link/save`, {descricao: titulo, linkUrl: url}, { headers });
  }

  getLinks(){
    const token = this.authService.getAdmToken() ?? this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{descricao: string, linkUrl: string, id: number}[]>(`${this.getUrl()}/links`, {
      headers
    });
  }

  deleteLink(linkId: number){
    const token = this.authService.getAdmToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
    .set('linkid', linkId)
    
    return this.http.delete<RequestResult<number[]>>(this.getUrl()+"/link/delete", { headers, params });
  }


  


}
