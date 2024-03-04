import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { TarefasEditionComponent, tarefasEditionData } from 'src/app/shared/tarefas-edition/tarefas-edition.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-secundarias',
  templateUrl: './secundarias.component.html',
  styleUrls: ['./secundarias.component.css']
})
export class SecundariasComponent implements OnInit {
  faPlus = faPlus;

  constructor(private dialog: MatDialog,
              private authService: AuthService){ }

  ngOnInit(): void {
  }

  openTarefaEdition(){
    const user = this.authService.getUser();
    const dialogConf: tarefasEditionData = {isPrincipal: false, criadorId: user?.id!, destinatarioId: user?.id!};
    this.dialog.open(TarefasEditionComponent, {
      width: "500px",
      data: dialogConf
    });
  }

}