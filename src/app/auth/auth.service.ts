import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }
  private token: string | null = "aaa";

  private getUrl(){
    return "http://localhost:5149";
  }

  get(){
    this.http.get("http://localhost:5149/user").subscribe(data => {
      console.log(data);
    })
  }

  isAuthenticated(){
    return this.token != null;
  }

  cadastro(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.getUrl()}/user`, user, { headers })
  }

  login(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<{ token:string }>(`${this.getUrl()}/auth/login`, user, { headers })
      .subscribe(response => {
        this.token = response.token;
        this.router.navigate(['gerenciador']);
      }, error => {
        /// arrumar mensagem de error aqui
        console.log(error)
      })
  }
}
