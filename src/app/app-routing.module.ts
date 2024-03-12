import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './gerenciador/main/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginRedirectGuard } from './guards/login-redirect-guard.guard';
import { PrincipaisComponent } from './gerenciador/main/principais/principais.component';
import { SecundariasComponent } from './gerenciador/main/secundarias/secundarias.component';
import { AlunoComponent } from './gerenciador/main/aluno/aluno.component';
import { TarefaComponent } from './gerenciador/main/tarefa/tarefa.component';

const routes: Routes = [
  { path: '', redirectTo: 'gerenciador', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'gerenciador', component: GerenciadorComponent, canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'principais', component: PrincipaisComponent },
    { path: 'secundarias', component: SecundariasComponent },
    { path: 'aluno/:id', component: AlunoComponent },
    { path: 'tarefa/:id', component: TarefaComponent}
  ]},
  { path: 'cadastro', component: CadastroComponent},
  { path: '**', component: GerenciadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
