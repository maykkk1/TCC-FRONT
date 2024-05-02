import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MensagemService } from '../services/mensagem.service';
import { UserService } from '../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formCodigo: FormGroup;
  cadastrarAluno: boolean = false;
  codigoValidado: boolean = false;
  codigoCadastro: number;

  constructor(private authService: AuthService,
              private messageService: MensagemService,
              private userService: UserService,
              private dialogRef: DialogRef<CadastroComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { cadastrarAluno: boolean}
  ){}


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      sobrenome: new FormControl(null),
      telefone: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      confirm: new FormControl(null),
      codigoCadastro: new FormControl(null),
      orientadorId: new FormControl(null)
    });

    this.formCodigo = new FormGroup({
      codigo: new FormControl(null)
    })

    this.cadastrarAluno = this.data.cadastrarAluno;
  }

  onSubmit(){
    const value = this.form.value;
    this.authService.cadastro(value).subscribe(data => {
      this.messageService.ShowMessage("Cadastrado com sucesso!", 3000, true);
      this.dialogRef.close()
    }, error => {
      this.messageService.showErrorModal(error.error)
    });
  }

  validarCodigo(){
    const codigo = this.formCodigo.get('codigo')?.value;
    this.userService.validarCodigoCadastro(parseInt(codigo)).subscribe(result => {
      this.form.get('orientadorId')?.setValue(result.orientadorId);
      this.form.get('codigoCadastro')?.setValue(result.codigo);
      this.codigoCadastro = result.codigo;
      this.codigoValidado = true;
    }, error => {
      this.messageService.showErrorModal(error.error)
    });
  }

  ngOnDestroy(): void {
  }

}
