import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-painel',
  templateUrl: './login-painel.component.html',
  styleUrls: ['./login-painel.component.css']
})
export class LoginPainelComponent {
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

  ngOnDestroy(): void {
  }

}
