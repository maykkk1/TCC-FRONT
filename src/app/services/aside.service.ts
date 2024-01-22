import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TipoPessoaEnum } from '../shared/enums/tipoPessoa.enum';

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  constructor(private authService: AuthService) { }
  isCollapesed: boolean = false;
  collapsedChange: Subject<Boolean> = new Subject<Boolean>();

  getCollapesedValue(){
    return this.isCollapesed;
  }

  setCollapesedValue(){
    this.isCollapesed = !this.isCollapesed;
    this.collapsedChange.next(this.isCollapesed);
  }

  getMenuByTipo(){
    if(this.authService.getUser().tipo = TipoPessoaEnum.Aluno){
      return []
    } else {
      return []
    }
  }
}
