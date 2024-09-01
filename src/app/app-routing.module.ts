import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './gerenciador/main/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { LoginRedirectGuard } from './guards/login-redirect-guard.guard';
import { PrincipaisComponent } from './gerenciador/main/principais/principais.component';
import { SecundariasComponent } from './gerenciador/main/secundarias/secundarias.component';
import { AlunoComponent } from './gerenciador/main/aluno/aluno.component';
import { AlunosComponent } from './gerenciador/main/alunos/alunos.component';
import { ProjetoComponent } from './gerenciador/main/projeto/projeto.component';
import { ConquistasComponent } from './gerenciador/main/conquistas/conquistas.component';
import { PainelComponent } from './painel/painel.component';
import { LoginPainelComponent } from './painel/login-painel/login-painel.component';
import { HomePainelComponent } from './painel/home-painel/home-painel.component';
import { AdmGuard } from './auth/adm.guard';

const routes: Routes = [
  { path: '', redirectTo: 'gerenciador', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'painel', component: PainelComponent, children: [
    {path: 'login', component: LoginPainelComponent},
    {path: 'home', component: HomePainelComponent, canActivate: [AdmGuard]}
  ] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'gerenciador', component: GerenciadorComponent, canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'principais', component: PrincipaisComponent },
    { path: 'secundarias', component: SecundariasComponent },
    { path: 'aluno/:id', component: AlunoComponent },
    { path: 'projeto/:id', component: ProjetoComponent },
    { path: 'alunos', component: AlunosComponent },
    { path: 'conquistas', component: ConquistasComponent },
  ]},
  { path: '**', component: GerenciadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
