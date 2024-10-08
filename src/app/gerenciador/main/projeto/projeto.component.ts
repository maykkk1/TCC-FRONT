import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faPenToSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Projeto } from 'src/app/model/projeto.model';
import { User } from 'src/app/model/user.model';
import { AlunoService } from 'src/app/services/aluno.service';
import { AsideService } from 'src/app/services/aside.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { AddAlunoModalComponent } from 'src/app/shared/add-aluno-modal/add-aluno-modal.component';
import { ProjetoViewSectionEnum } from 'src/app/shared/enums/alunoViewSection.enum';
import { ProjectEditionComponent } from 'src/app/shared/project-edition/project-edition.component';
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefa/tarefas-edition/tarefas-edition.component';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent {
  viewSection: ProjetoViewSectionEnum = ProjetoViewSectionEnum.Board;
  aluno: User;
  projeto: Projeto;
  projetoId: number;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faUserPlus = faUserPlus;

  viewHandler$Sub: Subscription;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService,
              private asideService: AsideService,
              private alunoService: AlunoService,
              private projetoService: ProjetoService){ }


  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('projeto'+this.projetoId)
    this.route.paramMap.pipe(
      switchMap(params => {
        this.asideService.menuSelectedChange.next('projeto'+params.get('id')!)
        this.projetoId = parseInt(params.get('id')!);
        console.log(this.projetoId)

        return this.projetoService.getProjeto(this.projetoId)
      })
    ).subscribe(response => {
      this.projeto = response.data;
    })

    // this.atividadesService.getAllById(this.projetoId).subscribe(data => console.log(data));
    this.viewHandler$Sub = this.alunoService.alunoViewHandler.subscribe(value => this.viewSection = value)
  }

  openTarefaEdition(){
    const user = this.authService.getUser();
    const dialogConf: tarefasEditionData = {isProjeto: true, criadorId: user?.id!, destinatarioId: this.projetoId};
    this.dialog.open(TarefasEditionComponent, {
      width: "500px",
      data: dialogConf
    });
  }

  editProject(){
    this.dialog.open(ProjectEditionComponent, {
      width: "500px",
      data: { edition: true, project: this.projeto }
    });
  }

  addAluno(){
    this.dialog.open(AddAlunoModalComponent, {
      width: "500px",
      data: { projetoId: this.projetoId }
    });
  }

  ngOnDestroy(): void {
    this.viewHandler$Sub.unsubscribe();
  }

}
