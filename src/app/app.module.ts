import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDiagnosticComponent } from './components/diagnostic/create-diagnostic/create-diagnostic.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ClientComponent } from './components/client/client.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { LoginComponent } from './components/login/login.component';
import { ListDiagnosticsComponent } from './components/diagnostic/list-diagnostics/list-diagnostics.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateDiagnosticComponent,
    HomeComponent,
    ClientComponent,
    PdfComponent,
    LoginComponent,
    ListDiagnosticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
