import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://localhost:5149"

  constructor(private http: HttpClient) { }

  get(){
    this.http.get("http://localhost:5149/user").subscribe(data => {
      console.log(data);
    })
  }

  cadastro(user: User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.url}/user`, user, { headers })
  }
}
