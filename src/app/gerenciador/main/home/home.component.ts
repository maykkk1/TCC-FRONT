import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Atividade } from 'src/app/model/atividade.model';
import { User } from 'src/app/model/user.model';
import { AsideService } from 'src/app/services/aside.service';
import { AtividadesService } from 'src/app/services/atividades.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  atividades: any;

  constructor(private asideService: AsideService,
              private authService: AuthService,
              private atividadeService: AtividadesService){}
  
  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('home');
    this.user = this.authService.getUser()!;
    this.atividades = this.atividadeService.getAllById(this.user?.id!).subscribe(response => {
      this.atividades = response.data.slice(0, 5);
    });
  }

}
