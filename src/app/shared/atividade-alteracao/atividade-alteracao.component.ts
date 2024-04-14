import { Component, Input } from '@angular/core';
import { Atividade } from 'src/app/model/atividade.model';

@Component({
  selector: 'app-atividade-alteracao',
  templateUrl: './atividade-alteracao.component.html',
  styleUrls: ['./atividade-alteracao.component.css']
})
export class AtividadeAlteracaoComponent {
  @Input() atividade: Atividade;

}
