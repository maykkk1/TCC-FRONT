import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  faWarning = faWarning;
  errors: string[];

  constructor(private dialogRef: DialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string}){}

  ngOnInit(): void {
      this.errors = this.data.message.split(';');
  }

  close(){
    this.dialogRef.close()
  }

}
