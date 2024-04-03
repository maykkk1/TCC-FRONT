import { Component, Input } from '@angular/core';
import { Comentario } from 'src/app/model/comentario.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent {
  @Input() comentario: Comentario;
}
