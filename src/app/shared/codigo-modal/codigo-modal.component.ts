import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-codigo-modal',
  templateUrl: './codigo-modal.component.html',
  styleUrls: ['./codigo-modal.component.css']
})
export class CodigoModalComponent {
  codigo: number;
  faCopy = faCopy;

  constructor(private dialogRef: DialogRef<CodigoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { codigo: number},
    private clipboard: Clipboard){}

    copyCode(){
      this.clipboard.copy(this.data.codigo.toString())
    }

}
