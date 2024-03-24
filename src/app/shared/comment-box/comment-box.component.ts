import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
  comentario: string;
  @Output() comentarioEmitter: EventEmitter<string> = new EventEmitter<string>();


  comentar(){
    if(this.comentario.length < 1){
      return;
    }
    this.comentarioEmitter.emit(this.comentario)
  }

  cancelar(){
    this.comentario = '';
  }
}
