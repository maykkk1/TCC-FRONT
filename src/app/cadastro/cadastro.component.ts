import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

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
      password: new FormControl(null)
    });
  }

  onSubmit(){
    this.authService.cadastro(this.form.value).subscribe(data => {
    });
  }


  ngOnDestroy(): void {
  }

}
