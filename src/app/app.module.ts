import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './gerenciador/main/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { MainComponent } from './gerenciador/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TarefasViewComponent } from './tarefas-view/tarefas-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TarefasEditionComponent } from './shared/tarefa/tarefas-edition/tarefas-edition.component';
import { TarefasViewCardComponent } from './tarefas-view/tarefas-view-card/tarefas-view-card.component';
import { PrincipaisComponent } from './gerenciador/main/principais/principais.component';
import { SecundariasComponent } from './gerenciador/main/secundarias/secundarias.component';
import { AlunoComponent } from './gerenciador/main/aluno/aluno.component';
import { TarefaComponent } from './gerenciador/main/tarefa/tarefa.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { TarefaModalComponent } from './shared/tarefa/tarefa-modal/tarefa-modal.component';
import { CommentBoxComponent } from './shared/comment-box/comment-box.component';
import { ComentarioComponent } from './shared/comentario/comentario.component';
import { ContadorDirective } from './shared/diretivas/contador.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    GerenciadorComponent,
    MainComponent,
    TarefasViewComponent,
    TarefasEditionComponent,
    TarefasViewCardComponent,
    PrincipaisComponent,
    SecundariasComponent,
    AlunoComponent,
    TarefaComponent,
    LoadingComponent,
    TarefaModalComponent,
    CommentBoxComponent,
    ComentarioComponent,
    ContadorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
