import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsideService } from '../services/aside.service';
import { Subscription } from 'rxjs';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../model/user.model';
import { AuthService } from '../auth/auth.service';
import { TipoPessoaEnum } from '../shared/enums/tipoPessoa.enum';
import { UserService } from '../services/user.service';
import { ProjectEditionComponent } from '../shared/project-edition/project-edition.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjetoService } from '../services/projeto.service';
import { Projeto } from '../model/projeto.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  faBars = faBars;
  faPlus = faPlus;

  orientandos: User[] = [];
  projetos: Projeto[] = [];
  isCollapesed: Boolean;
  isCollapesed$Subscription: Subscription;
  selectedMenu$Subscription: Subscription;
  projeto$Subscription: Subscription;
  selectedMenu: string;
  user: User;

  constructor(private dialog: MatDialog,
              private asideService: AsideService,
              private authService: AuthService,
              private userService: UserService,
              private projetoService: ProjetoService){}

  ngOnInit(): void {
    this.isCollapesed = this.asideService.getCollapesedValue();

    this.isCollapesed$Subscription = this.asideService.collapsedChange.subscribe(value => {
      this.isCollapesed = value;
    })

    this.selectedMenu = this.asideService.getSelectedMenuItem();

    this.selectedMenu$Subscription = this.asideService.menuSelectedChange.subscribe(data => this.selectedMenu = data);

    this.user = this.authService.getUser()!;

    this.projetoService.getAllById(this.user.id).subscribe(result => {
      this.projetos = result.data;
    })

    //trocar para o pipe switchmap
    this.projeto$Subscription = this.projetoService.projetosChange.subscribe(() => {
      this.projetoService.getAllById(this.user.id).subscribe(result => {
        this.projetos = result.data;
      })
    })

    if(this.user?.tipo == TipoPessoaEnum.Professor){
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
    this.projeto$Subscription.unsubscribe();
  }

  addProject(){
    const user = this.authService.getUser();
    this.dialog.open(ProjectEditionComponent, {
      width: "500px",
      data: { edition: false, project: null }
    });
  }

}
