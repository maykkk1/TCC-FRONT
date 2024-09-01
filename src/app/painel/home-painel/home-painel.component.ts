import { Component } from '@angular/core';
import { AtividadesService } from 'src/app/services/atividades.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-home-painel',
  templateUrl: './home-painel.component.html',
  styleUrls: ['./home-painel.component.css']
})
export class HomePainelComponent {

  constructor(private atividadeService: AtividadesService, private mensagem: MensagemService){}

  notificar(texto: any){
    this.atividadeService.Notificar({descricao: texto}).subscribe(data => {
      this.mensagem.ShowMessage("Notificação enviada com sucesso!", 3000, true)
    }, error => {
      this.mensagem.ShowMessage("Falha ao enviar a notificação!", 3000, false)
    });
  }

}
