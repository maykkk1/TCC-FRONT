import { Component, OnInit } from '@angular/core';
import { AsideService } from 'src/app/services/aside.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private asideService: AsideService){}
  
  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('home');
  }

}
