import { Component, Input } from '@angular/core';
import { Atividade } from 'src/app/model/atividade.model';
import { AtividadesService } from 'src/app/services/atividades.service';

@Component({
  selector: 'app-atividades-view',
  templateUrl: './atividades-view.component.html',
  styleUrls: ['./atividades-view.component.css']
})
export class AtividadesViewComponent {
  ativividades: Atividade[]
  private _idAluno: number;

  constructor(private atividadesService: AtividadesService){}

  @Input()
  set idAluno(value: number) {
    if(this._idAluno != value){
      this._idAluno = value;
      this.atividadesService.getAllById(value).subscribe(atividades => {
        this.ativividades = atividades.data;
        console.log(this.ativividades)
      })
    }
  }

  get idAluno(): number {
    return this._idAluno;
  }

}
