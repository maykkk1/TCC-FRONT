import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsideService } from '../../services/aside.service';
import { Subscription } from 'rxjs';
import { ScreenHelperService } from 'src/app/services/screen-helper.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy, OnInit {
  isAsideCollapesed: Boolean;
  isAsideCollapesed$Subscription: Subscription;
  isSmallScreen: boolean;

  constructor(private asideService: AsideService, private screenHelperService: ScreenHelperService){}

  ngOnInit(): void {
    this.isAsideCollapesed = this.asideService.getCollapesedValue();

    this.isAsideCollapesed$Subscription = this.asideService.collapsedChange.subscribe(value => {
      this.isAsideCollapesed = value;
    })

    this.screenHelperService.isGreaterThanSmallScreen().subscribe(value => {
      this.isSmallScreen = value
    });
  }


  ngOnDestroy(): void {
    this.isAsideCollapesed$Subscription.unsubscribe();
  }

}
