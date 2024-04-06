
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appContador]'
})
export class ContadorDirective implements OnInit {
  @Input('appContador') numero: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if(this.numero < 1) return;
    const contadorElement = document.createElement('div');
    contadorElement.classList.add('contador-overlay');
    contadorElement.innerHTML = this.numero.toString();
    this.el.nativeElement.appendChild(contadorElement);
  }
}