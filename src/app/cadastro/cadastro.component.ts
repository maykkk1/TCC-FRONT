import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl("asdasdda@hotmail.com"),
      tipoPessoa: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit(){
    const value = { ...this.form.value, tipoPessoa: +this.form.value.tipoPessoa };
    this.authService.cadastro(value).subscribe(data => {
    });
  }


  ngOnDestroy(): void {
  }

}
