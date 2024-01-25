import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tarefas-view',
  templateUrl: './tarefas-view.component.html',
  styleUrls: ['./tarefas-view.component.css']
})
export class TarefasViewComponent {

  lista1 = [
    {name: 'teste1'},
    {name: 'teste2'},
  ]

  lista2 = [
    {name: 'teste1'},
    {name: 'teste2'},
  ]

  lista3 = [
    {name: 'teste1'},
    {name: 'teste2'},
  ]

  lista4 = [
    {name: 'teste1'},
    {name: 'teste2'},
  ]


  drop(event: CdkDragDrop<{ name: string; }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
