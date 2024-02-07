import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from 'src/app/model/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa-service.service';
import { SituacaoTarefaEnum } from 'src/app/shared/enums/situacaoTarefa.enum';
import { TipoTarefa } from 'src/app/shared/enums/tipoTarefa.enum';
import { MatDialog } from '@angular/material/dialog'; 
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefas-edition/tarefas-edition.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';

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

    // carregar dados do aluno
  }

  teste(){
    const tarefa = new Tarefa();

    tarefa.descricao = "Criada pelo professor";
    tarefa.situacao = SituacaoTarefaEnum.Pendente;
    tarefa.idPessoa = this.alunoId;
    tarefa.tipo = TipoTarefa.Principal;
    tarefa.titulo = "tarefa criada pelo professor"

    this.tarefaService.savePrincipal(tarefa);
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
