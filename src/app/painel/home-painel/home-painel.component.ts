import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AtividadesService } from 'src/app/services/atividades.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-painel',
  templateUrl: './home-painel.component.html',
  styleUrls: ['./home-painel.component.css']
})
export class HomePainelComponent implements OnInit{
  form: FormGroup;
  links: {descricao: string, linkUrl: string, id: number}[] = [];

  constructor(private atividadeService: AtividadesService, private mensagem: MensagemService,
              private userService: UserService, private authService: AuthService
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(null),
      link: new FormControl(null)
    });

    this.userService.getLinks().subscribe(data => {
      this.links = data;
    })
  }

  logout(){
    this.authService.logout();
  }

  notificar(texto: any){
    this.atividadeService.Notificar({descricao: texto}).subscribe(data => {
      this.mensagem.ShowMessage("Notificação enviada com sucesso!", 3000, true)
    }, error => {
      this.mensagem.ShowMessage("Falha ao enviar a notificação!", 3000, false)
    });
  }

  excluirLink(id: number){
    this.userService.deleteLink(id).subscribe(data => {
      this.mensagem.ShowMessage("Link Excluído com sucesso!", 3000, true)
    }, error => {
      this.mensagem.ShowMessage("Ocorreu um erro ao excluir o link!", 3000, false)
    })
  }

  criarLink(){
    const titulo = this.form.get('titulo')?.value;
    const link = this.form.get('link')?.value;

    console.log(link, titulo)

    if(titulo == null || link == null)
      return;

    this.userService.saveLink(titulo, link).subscribe(data => {
      this.mensagem.ShowMessage("Link salvo com sucesso!", 3000, true)
      this.form.reset();
    }, error => {
      this.mensagem.ShowMessage("Ocorreu um erro ao salver o link!", 3000, false)
    })
  }

}
