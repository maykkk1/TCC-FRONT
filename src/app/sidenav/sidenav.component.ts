import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsideService } from '../services/aside.service';
import { Subscription } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { User } from '../model/user.model';
import { AuthService } from '../auth/auth.service';
import { TipoPessoaEnum } from '../shared/enums/tipoPessoa.enum';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  faBars = faBars;
  orientandos: User[] = [];
  isCollapesed: Boolean;
  isCollapesed$Subscription: Subscription;
  selectedMenu$Subscription: Subscription;
  selectedMenu: string;

  constructor(private asideService: AsideService,
              private authService: AuthService,
              private userService: UserService){}

  ngOnInit(): void {
    this.isCollapesed = this.asideService.getCollapesedValue();

    this.isCollapesed$Subscription = this.asideService.collapsedChange.subscribe(value => {
      this.isCollapesed = value;
    })

    this.selectedMenu = this.asideService.getSelectedMenuItem();

    this.selectedMenu$Subscription = this.asideService.menuSelectedChange.subscribe(data => this.selectedMenu = data);

    const user = this.authService.getUser();

    if(user?.tipo == TipoPessoaEnum.Professor){
      this.userService.getOrientandos().subscribe(data => this.orientandos = data);
    }
  }

  asideHandler(){
    this.asideService.setCollapesedValue();
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.isCollapesed$Subscription.unsubscribe();
    this.selectedMenu$Subscription.unsubscribe();
  }

}
