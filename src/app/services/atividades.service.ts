import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MensagemService } from './mensagem.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestResult } from '../shared/requestResult/request-result.model';
import { Atividade } from '../model/atividade.model';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  constructor(private authService: AuthService,
    private http: HttpClient) { }

  private getUrl(){
    return "http://localhost:5149/atividade";
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
    
    return this.http.get<RequestResult<Atividade[]>>(this.getUrl(), { headers, params });
  }
}