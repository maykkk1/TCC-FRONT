import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  constructor() { }
  isCollapesed: boolean = false;
  collapsedChange: Subject<Boolean> = new Subject<Boolean>();

  getCollapesedValue(){
    return this.isCollapesed;
  }

  setCollapesedValue(){
    this.isCollapesed = !this.isCollapesed;
    this.collapsedChange.next(this.isCollapesed);
  }
}
