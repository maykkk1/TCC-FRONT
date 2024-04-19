import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { MensagemService } from '../services/mensagem.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(private authService: AuthService,
              private messageService: MensagemService
  ){}


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      sobrenome: new FormControl(null),
      telefone: new FormControl(null),
      email: new FormControl("asdasdda@hotmail.com"),
      password: new FormControl(null),
      confirm: new FormControl(null)
    });
  }

  onSubmit(){
    if(this.form.get('password')?.value != this.form.get('confirm')?.value) {
      return this.messageService.ShowMessage("As senhas devem ser iguais", 3000, false);
    }
    const value = this.form.value;
    this.authService.cadastro(value).subscribe(data => {
    });
  }


  ngOnDestroy(): void {
  }

}
