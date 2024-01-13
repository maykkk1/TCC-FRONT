import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsideService } from '../services/aside.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isCollapesed: Boolean;
  isCollapesed$Subscription: Subscription;

  constructor(private asideService: AsideService){}

  ngOnInit(): void {
    this.isCollapesed = this.asideService.getCollapesedValue();

    this.isCollapesed$Subscription = this.asideService.collapsedChange.subscribe(value => {
      this.isCollapesed = value;
    })
  }

  asideHandler(){
    this.asideService.setCollapesedValue();
  }


  ngOnDestroy(): void {
    this.isCollapesed$Subscription.unsubscribe();
  }

}
