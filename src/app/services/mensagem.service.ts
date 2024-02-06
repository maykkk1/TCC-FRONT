import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private mensagem: MatSnackBar) { }

  ShowMessage(message: string, duration: number, isSuccess: boolean): void {
    this.mensagem.open(message, 'Fechar', {
      verticalPosition: 'bottom',
      duration: duration,
      horizontalPosition: 'right', 
      panelClass: [isSuccess ? 'success-snackbar' : 'error-snackbar'], 
    });
  }
}
