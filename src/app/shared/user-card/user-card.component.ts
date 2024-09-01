import { Component, Input, OnInit } from '@angular/core';
import { Conquista } from 'src/app/model/conquista.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  conquistas: Conquista[] | any;
  @Input()
  user: User;
  pontosPorcentagem: any; 

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getConquistas(this.user.id).subscribe(data => {
      this.conquistas = data;
      this.conquistas = this.conquistas.slice(0, 2)
    });
}
}
