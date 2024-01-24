import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginRedirectGuard } from './guards/login-redirect-guard.guard';
import { TarefasViewComponent } from './tarefas-view/tarefas-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'gerenciador', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'gerenciador', component: GerenciadorComponent, canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'tarefas', component: TarefasViewComponent }
  ]},
  { path: 'cadastro', component: CadastroComponent},
  // { path: '**', component: GerenciadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
