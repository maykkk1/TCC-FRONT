import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationComponent } from '../shared/notification/notification.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private mensagem: MatSnackBar, private dialog: MatDialog) { }

  ShowMessage(message: string, duration: number, isSuccess: boolean): void {
    this.mensagem.open(message, 'Fechar', {
      verticalPosition: 'bottom',
      duration: duration,
      horizontalPosition: 'right', 
      panelClass: [isSuccess ? 'success-snackbar' : 'error-snackbar'], 
    });
  }

  showErrorModal(message: string){
    this.dialog.open(ErrorModalComponent, {
      maxWidth: "500px",
      width: "100%",
      data: { message: message }
    });
  }
}
