import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MensagemService } from './services/mensagem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TCC-FRONT';

  constructor(private authService: AuthService, private mensagemService: MensagemService){}


  ngOnInit(): void {
    this.authService.onStart();
  }
}
