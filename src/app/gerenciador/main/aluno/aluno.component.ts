import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { MatDialog } from '@angular/material/dialog'; 
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefas-edition/tarefas-edition.component';
import { AuthService } from 'src/app/auth/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AsideService } from 'src/app/services/aside.service';
import { AlunoViewSectionEnum } from 'src/app/shared/enums/alunoViewSection.enum';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent  implements OnInit {
  viewSection: AlunoViewSectionEnum = AlunoViewSectionEnum.Home;
  alunoId: number;
  faPlus = faPlus;

  constructor(private route: ActivatedRoute,
              private tarefaService: TarefaService,
              private dialog: MatDialog,
              private authService: AuthService,
              private asideService: AsideService){ }


  ngOnInit(): void {
    this.asideService.menuSelectedChange.next('aluno'+this.alunoId)

    this.route.paramMap.subscribe(params => {
      this.asideService.menuSelectedChange.next('aluno'+params.get('id')!)
      this.alunoId = parseInt(params.get('id')!);
    });
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
