import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Atividade } from 'src/app/model/atividade.model';
import { User } from 'src/app/model/user.model';
import { AsideService } from 'src/app/services/aside.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  atividades: any;
  links: {descricao: string, linkUrl: string}[] = [];

  constructor(private asideService: AsideService,
              private authService: AuthService,
              private atividadeService: AtividadesService,
              private userService: UserService){}
  
  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('home');
    this.user = this.authService.getUser()!;
    this.atividades = this.atividadeService.getAllById(this.user?.id!).subscribe(response => {
      this.atividades = response.data.slice(0, 5);
    });

    this.userService.getLinks().subscribe(data => {
      console.log(data)
      this.links = data;
    })
  }

}
