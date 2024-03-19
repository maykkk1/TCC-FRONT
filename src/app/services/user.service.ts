import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';

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

    return this.http.get<User[]>(`${this.getUrl()}/aluno`, { headers, params });
  }


}
