import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentarioTarefaService {

  constructor() { }

  private getUrl(){
    return "http://localhost:5149/tarefas";
  }
}
