import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { MatDialog } from '@angular/material/dialog'; 
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefas-edition/tarefas-edition.component';
import { AuthService } from 'src/app/auth/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AsideService } from 'src/app/services/aside.service';
import { AlunoViewSectionEnum } from 'src/app/shared/enums/alunoViewSection.enum';
import { User } from 'src/app/model/user.model';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent  implements OnInit {
  viewSection: AlunoViewSectionEnum = AlunoViewSectionEnum.Board;
  alunoId: number;
  aluno: User;
  faPlus = faPlus;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService,
              private asideService: AsideService,
              private userService: UserService){ }


  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('aluno'+this.alunoId)
    this.route.paramMap.pipe(
      switchMap(params => {
        this.asideService.menuSelectedChange.next('aluno'+params.get('id')!)
        this.alunoId = parseInt(params.get('id')!);

        return this.userService.getAluno(this.alunoId)
      })
    ).subscribe(data => {
      console.log(data)
    })
  }

  openTarefaEdition(){
    const user = this.authService.getUser();
    const dialogConf: tarefasEditionData = {isPrincipal: true, criadorId: user?.id!, destinatarioId: this.alunoId};
    this.dialog.open(TarefasEditionComponent, {
      width: "500px",
      data: dialogConf
    });
  }

}
