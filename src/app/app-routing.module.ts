import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateDiagnosticComponent } from './diagnostic/create-diagnostic/create-diagnostic.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
