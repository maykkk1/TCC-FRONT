import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(private authService: AuthService,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  login(){
    this.authService.login(this.form.value);
  }

  cadastrar(cadastrarAluno: boolean){
    this.dialog.open(CadastroComponent, {
      maxWidth: "500px",
      width: "100%",
      data: { cadastrarAluno: cadastrarAluno }
    });
  }

  ngOnDestroy(): void {
  }

}
