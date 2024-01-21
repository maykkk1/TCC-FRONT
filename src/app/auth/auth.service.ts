import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { Auth } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }
  auth: Auth;

  private getUrl(){
    return "http://localhost:5149";
  }

  get(){
    this.http.get("http://localhost:5149/user").subscribe(data => {
      console.log(data);
    })
  }

  isAuthenticated(){
    return this.auth != null;
  }

  cadastro(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.getUrl()}/user`, user, { headers })
  }

  onStart(){
    const user: Auth = JSON.parse(localStorage.getItem('gerenciador-auth')!);
    if(user != null){
      this.auth = user;
    }
  }

  login(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Auth>(`${this.getUrl()}/auth/login`, user, { headers })
      .subscribe(response => {
        localStorage.setItem('gerenciador-auth', JSON.stringify(response))
        this.auth = response;
        this.router.navigate(['gerenciador']);
      }, error => {
        /// arrumar mensagem de error aqui
        console.log(error)
      })
  }
}
