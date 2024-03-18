import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  showSpinner: boolean = false;



  ngOnInit(): void {
    setTimeout(() => {
      this.showSpinner = true;
    }, 100);
  }
  

}
