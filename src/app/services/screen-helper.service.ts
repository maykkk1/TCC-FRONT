import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenHelperService {

  constructor(private breakpointObserver: BreakpointObserver) {}
  isGreaterThanSmallScreen(): Observable<boolean> {
    return this.breakpointObserver.observe([
        Breakpoints.Small, 
        Breakpoints.Medium, 
        Breakpoints.Large, 
        Breakpoints.XLarge
      ])
      .pipe(
        map(result => {
          return result.breakpoints[Breakpoints.Medium] || 
                 result.breakpoints[Breakpoints.Large] || 
                 result.breakpoints[Breakpoints.XLarge];
        })
      );
  }

}
