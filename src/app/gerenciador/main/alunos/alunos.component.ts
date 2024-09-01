import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/user.model';
import { AsideService } from 'src/app/services/aside.service';
import { UserService } from 'src/app/services/user.service';
import { CodigoModalComponent } from 'src/app/shared/codigo-modal/codigo-modal.component';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos: User[] = [];
  faUserPlus = faUserPlus;

  constructor(private userService: UserService,
              private asideService: AsideService,
              private dialog: MatDialog
  ){}


  ngOnInit(): void {
    this.asideService.menuSelectedChange.next("alunos");

    this.userService.getOrientandos().subscribe(data => this.alunos = data);
    console.log(this.alunos)
  }

  gerarCodigo(){
    this.userService.gerarCodigoCadastro().subscribe(codigo => {
      this.dialog.open(CodigoModalComponent, {
        maxWidth: "500px",
        width: "100%",
        data: { codigo: codigo.data }
      });
    })

  }

}
