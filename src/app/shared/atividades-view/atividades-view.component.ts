import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Atividade } from 'src/app/model/atividade.model';
import { AtividadesService } from 'src/app/services/atividades.service';

@Component({
  selector: 'app-atividades-view',
  templateUrl: './atividades-view.component.html',
  styleUrls: ['./atividades-view.component.css']
})
export class AtividadesViewComponent implements OnInit{
  ativividades: Atividade[]
  private _idAluno: number;

  constructor(private atividadesService: AtividadesService){}

  ngOnInit(): void {
    this.atividadesService.atividadeChange.pipe(
      switchMap(() => this.atividadesService.getAllById(this._idAluno))
    ).subscribe(atividades => this.ativividades = atividades.data)
  }

  @Input()
  set idAluno(value: number) {
    if(this._idAluno != value){
      this._idAluno = value;
      this.atividadesService.getAllById(value).subscribe(atividades => {
        this.ativividades = atividades.data;
      })
    }
  }

  get idAluno(): number {
    return this._idAluno;
  }

}
