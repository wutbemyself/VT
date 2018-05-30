
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
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatInputModule,MatButtonModule, MatCheckboxModule} from '@angular/material';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'product', component: PuductComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuductComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // BrowserAnimationsModule,
    // MatInputModule,
    // MatButtonModule,
    // MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
