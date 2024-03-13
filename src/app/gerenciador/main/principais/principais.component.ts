import { Component, OnInit } from '@angular/core';
import { AsideService } from 'src/app/services/aside.service';

@Component({
  selector: 'app-principais',
  templateUrl: './principais.component.html',
  styleUrls: ['./principais.component.css']
})
export class PrincipaisComponent  implements OnInit{

  constructor(private asideService: AsideService){}
  
  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('principais');
  }

}
