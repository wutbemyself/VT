
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {AppRoutes} from './app.routes';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { LoginComponent } from './login/login.component';
import { PuductComponent } from './puduct/puduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboarddComponent } from './dashboardd/dashboardd.component';
// import { AccordionModule } from 'primeng/accordion';
// import { MenuItem } from 'primeng/api';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DataListModule, PanelModule, ButtonModule, RadioButtonModule } from 'primeng/primeng';
import {enableProdMode} from '@angular/core';
const appRoutes: Routes = [
  { path: '', component: DashboarddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product', component: PuductComponent },
  { path: '*', component: DashboarddComponent },
  { path: '**', component: DashboarddComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuductComponent,
    DashboarddComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
