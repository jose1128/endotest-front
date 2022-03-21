import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateDiagnosticComponent } from './components/diagnostic/create-diagnostic/create-diagnostic.component';
import { ListDiagnosticsComponent } from './components/diagnostic/list-diagnostics/list-diagnostics.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "paciente",
    component: ClientComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "diagnostico",
    component: CreateDiagnosticComponent
  },
  {
    path: "buscar-diagnostico",
    component: ListDiagnosticsComponent
  },
  {
    path: "**", component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
