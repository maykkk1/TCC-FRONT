import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  constructor(){}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
