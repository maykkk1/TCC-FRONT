import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  alunoViewHandler: Subject<number> = new Subject();

  constructor() { }

  moveToBoard(){
    this.alunoViewHandler.next(1);
  }
}
