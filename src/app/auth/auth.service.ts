import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroUser, User } from '../model/user.model';
import { Router } from '@angular/router';
import { Auth } from '../model/auth.model';
import { MensagemService } from '../services/mensagem.service';
import { TipoPessoaEnum } from '../shared/enums/tipoPessoa.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private mensagemService: MensagemService) { }
  auth: Auth | null;
  authAdm: Auth | null;

  private getUrl(){
    return "http://localhost:5149";
  }

  get(){
    this.http.get("http://localhost:5149/user").subscribe(data => {
      console.log(data);
    })
  }

  getUser(){
    return this.auth?.user;
  }

  getToken(){
    return this.auth?.token;
  }

  getAdmToken(){
    return this.authAdm?.token;
  }

  isAuthenticated(){
    return this.auth != null;
  }

  isAdmAuthenticated(){
    return this.authAdm != null;
  }

  cadastro(user: CadastroUser){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if(user.codigoCadastro != null){
      user.codigoCadastro = parseInt(user.codigoCadastro);
      user.orientadorId = parseInt(user.orientadorId);
    }
    console.log(user);

    return this.http.post(`${this.getUrl()}/user`, user, { headers })
  }

  onStart(){
    const authBack: Auth = JSON.parse(localStorage.getItem('gerenciador-auth')!);
    if(authBack.user.tipo == TipoPessoaEnum.Adm && authBack != null) {
      this.authAdm = authBack
    } else {
      this.auth = authBack
    }
  }

  login(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Auth>(`${this.getUrl()}/auth/login`, user, { headers })
      .subscribe(response => {
        localStorage.setItem('gerenciador-auth', JSON.stringify(response))
        if(response.user.tipo == TipoPessoaEnum.Adm){
          this.authAdm = response;
        } else {
          this.auth = response;
        }

        if(this.auth != null) {
          this.router.navigate(['gerenciador']);
        } else {
          this.router.navigate(['painel/home']);
        }
        
        this.mensagemService.ShowMessage("Login efetuado com sucesso!", 3000, true);
      }, error => {
        if(error.error.message){
          this.mensagemService.ShowMessage(error.error.message, 5000, false);
        } else {
          this.mensagemService.ShowMessage("Ocorreu um erro ao fazer a autenticação.", 5000, false);
        }
      })
  }

  logout(){
    this.auth = null;
    localStorage.removeItem('gerenciador-auth')
    this.router.navigate(['login']);
  }
}
