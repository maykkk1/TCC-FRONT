import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsideService } from 'src/app/services/aside.service';
import { UserService } from 'src/app/services/user.service';
import { CodigoModalComponent } from 'src/app/shared/codigo-modal/codigo-modal.component';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  constructor(private userService: UserService,
              private asideService: AsideService,
              private dialog: MatDialog
  ){}


  ngOnInit(): void {
    this.asideService.menuSelectedChange.next("alunos");
  }

  gerarCodigo(){
    this.userService.gerarCodigoCadastro().subscribe(codigo => {
      console.log(codigo.data)
      this.dialog.open(CodigoModalComponent, {
        maxWidth: "500px",
        width: "100%",
        data: { codigo: codigo.data }
      });
    })
  }

}
