import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TarefaService } from '../services/tarefa-service.service';
import { Tarefa } from '../model/tarefa.model';
import { SituacaoTarefaEnum } from '../shared/enums/situacaoTarefa.enum';
import { MensagemService } from '../services/mensagem.service';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user.model';
import { TipoPessoaEnum } from '../shared/enums/tipoPessoa.enum';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tarefas-view',
  templateUrl: './tarefas-view.component.html',
  styleUrls: ['./tarefas-view.component.css'],
  host: { 'style': 'flex-grow:1' }
})
export class TarefasViewComponent implements OnInit, OnDestroy, AfterViewInit {
  private scrollInterval: any;

  scrollAtivo: boolean = false;

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  task$Sub: Subscription;

  colunas: any = {
    pendente: [],
    fazendo: [],
    analise: [],
    retorno: [],
    concluida: []
  }

  user: User | undefined;

  @Input() isPrincipal: boolean = false;

  private _idAluno: number;
  @Input()
  set idAluno(value: number) {
    if (value !== this._idAluno) {
      this._idAluno = value;
      this.tarefaSerice.getTarefas(this.isPrincipal, this.idAluno).subscribe(data => {
        this.filtrarTarefas(data.data);
      });
    }
  }

  get idAluno(): number {
    return this._idAluno;
  }

  @ViewChild('tarefas', { read: ElementRef }) public tarefas: ElementRef<any>;

  constructor(private tarefaSerice: TarefaService,
    private mensagemService: MensagemService,
    private authService: AuthService) { }

  ngAfterViewInit(): void {
    const element: HTMLElement = this.tarefas.nativeElement;
    if(element.scrollWidth > element.clientWidth){
      this.scrollAtivo = true;
    }
  }

  ngOnInit(): void {

    this.user = this.authService.getUser();

    this.tarefaSerice.getTarefas(this.isPrincipal, this.idAluno != null ? this.idAluno : this.user?.id!).subscribe(data => {
      this.filtrarTarefas(data.data);
    });

    this.task$Sub = this.tarefaSerice.taskChange.pipe(
      switchMap(() => this.tarefaSerice.getTarefas(this.isPrincipal, this.idAluno != null ? this.idAluno : this.user?.id!))
    ).subscribe(data => {
      this.filtrarTarefas(data.data);
    })
  }

  filtrarTarefas(data: Tarefa[]) {
    this.colunas.pendente = data.filter(t => t.situacao == SituacaoTarefaEnum.Pendente);
    this.colunas.fazendo = data.filter(t => t.situacao == SituacaoTarefaEnum.Fazendo);
    this.colunas.analise = data.filter(t => t.situacao == SituacaoTarefaEnum.Analise);
    this.colunas.retorno = data.filter(t => t.situacao == SituacaoTarefaEnum.Retorno);
    this.colunas.concluida = data.filter(t => t.situacao == SituacaoTarefaEnum.Concluida);
  }

  ngOnDestroy(): void {
    this.task$Sub.unsubscribe();
  }

  drop(event: CdkDragDrop<Tarefa[]>) {

    const previousContainerReference = this.getPreviousContainerReference(event.previousContainer.id)

    let newSituacao = this.containerIdToEnum(event.container.id);

    if ((newSituacao == 3 || newSituacao == 4) && this.isPrincipal && !(event.previousContainer === event.container) && this.user?.tipo != TipoPessoaEnum.Professor) {
      this.mensagemService.ShowMessage("Apenas o orientador pode concluir tarefas principais.", 10000, false)
      return;
    }

    let tarefa: Tarefa = new Tarefa();

    if (!(event.previousContainer === event.container)) {
      previousContainerReference[event.previousIndex].situacao = newSituacao;
      tarefa = previousContainerReference[event.previousIndex];

      this.tarefaSerice.update(tarefa).subscribe(data => {
      }, error => {
        this.mensagemService.ShowMessage(error.error, 5000, false)
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
        } else {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex,
          );
        }
      });
    }

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

  getPreviousContainerReference(previousContainerId: string) {
    switch (previousContainerId) {
      case "pendente":
        return this.colunas.pendente;
      case "fazendo":
        return this.colunas.fazendo;
      case "analise":
        return this.colunas.analise;
      case "retorno":
        return this.colunas.retorno;
      default:
        return this.colunas.concluida;
    }
  }

  containerIdToEnum(containerId: string) {
    switch (containerId) {
      case "pendente":
        return 0;
      case "fazendo":
        return 1;
      case "analise":
        return 2;
      case "concluida":
        return 3;
      default:
        return 4;
    }
  }

  left() {
    this.tarefas.nativeElement.scrollTo({ left: (this.tarefas.nativeElement.scrollLeft + 10) });
  }

  right() {
    this.tarefas.nativeElement.scrollTo({ left: (this.tarefas.nativeElement.scrollLeft - 10) });
  }

  startScrolling(direcao: string) {
    if (direcao == 'left') {
      this.scrollInterval = setInterval(() => {
        this.left()
      }, 30);
    } else {
      this.scrollInterval = setInterval(() => {
        this.right()
      }, 30);
    }
  }

  stopScrolling() {
    clearInterval(this.scrollInterval);
  }





}
