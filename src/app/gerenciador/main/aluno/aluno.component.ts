import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { MatDialog } from '@angular/material/dialog'; 
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefa/tarefas-edition/tarefas-edition.component';
import { AuthService } from 'src/app/auth/auth.service';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { AsideService } from 'src/app/services/aside.service';
import { ProjetoViewSectionEnum } from 'src/app/shared/enums/alunoViewSection.enum';
import { User } from 'src/app/model/user.model';
import { Subscription, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent  implements OnInit, OnDestroy {
  viewSection: ProjetoViewSectionEnum = ProjetoViewSectionEnum.Atividade;
  alunoId: number;
  aluno: User;
  faPlus = faPlus;
  faUser = faUser;

  viewHandler$Sub: Subscription;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService,
              private asideService: AsideService,
              private userService: UserService,
              private atividadesService: AtividadesService,
              private alunoService: AlunoService){ }


  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('aluno'+this.alunoId)
    this.route.paramMap.pipe(
      switchMap(params => {
        this.asideService.menuSelectedChange.next('aluno'+params.get('id')!)
        this.alunoId = parseInt(params.get('id')!);

        return this.userService.getAluno(this.alunoId)
      })
    ).subscribe(data => {
      this.aluno = data;
    })

    this.atividadesService.getAllById(this.alunoId).subscribe(data => console.log(data));
    this.viewHandler$Sub = this.alunoService.alunoViewHandler.subscribe(value => this.viewSection = value)
  }

  openTarefaEdition(){
    const user = this.authService.getUser();
    const dialogConf: tarefasEditionData = {isProjeto: true, criadorId: user?.id!, destinatarioId: this.alunoId};
    this.dialog.open(TarefasEditionComponent, {
      width: "500px",
      data: dialogConf
    });
  }

  ngOnDestroy(): void {
    this.viewHandler$Sub.unsubscribe();
  }

}
