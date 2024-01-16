import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsideService } from '../services/aside.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy, OnInit {
  isAsideCollapesed: Boolean;
  isAsideCollapesed$Subscription: Subscription;

  constructor(private asideService: AsideService){}

  ngOnInit(): void {
    this.isAsideCollapesed = this.asideService.getCollapesedValue();

    this.isAsideCollapesed$Subscription = this.asideService.collapsedChange.subscribe(value => {
      this.isAsideCollapesed = value;
    })
  }


  ngOnDestroy(): void {
    this.isAsideCollapesed$Subscription.unsubscribe();
  }

}
