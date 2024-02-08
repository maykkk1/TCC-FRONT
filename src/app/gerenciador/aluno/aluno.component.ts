import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { MatDialog } from '@angular/material/dialog'; 
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefas-edition/tarefas-edition.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent  implements OnInit{
  alunoId: number;

  constructor(private route: ActivatedRoute,
              private tarefaService: TarefaService,
              private dialog: MatDialog,
              private authService: AuthService){ }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
