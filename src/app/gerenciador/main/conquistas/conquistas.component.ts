import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Conquista } from 'src/app/model/conquista.model';
import { AsideService } from 'src/app/services/aside.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.component.html',
  styleUrls: ['./conquistas.component.css']
})
export class ConquistasComponent implements OnInit {
  conquistas: Conquista[] | any; 

  constructor(private userService: UserService, private asideService: AsideService,private auth: AuthService){}

  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('conquistas');
    const user = this.auth.getUser();

    this.userService.getConquistas(user!.id).subscribe(data => {
      this.conquistas = data;
    });

  }

}
