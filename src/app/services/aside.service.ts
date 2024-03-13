import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TipoPessoaEnum } from '../shared/enums/tipoPessoa.enum';

@Injectable({
  providedIn: 'root'
})
export class AsideService {

  constructor(private authService: AuthService) { }
  isCollapesed: boolean = true;
  collapsedChange: Subject<Boolean> = new Subject<Boolean>();
  menuSelected: string;
  menuSelectedChange: Subject<string> = new Subject<string>();

  getCollapesedValue(){
    return this.isCollapesed;
  }

  getSelectedMenuItem(){
    return this.menuSelected;
  }

  setCollapesedValue(){
    this.isCollapesed = !this.isCollapesed;
    this.collapsedChange.next(this.isCollapesed);
  }

  getMenuByTipo(){
    const user = this.authService.getUser();
    if(user && user.tipo == TipoPessoaEnum.Aluno){
      return []
    }
    return []
  }
}
