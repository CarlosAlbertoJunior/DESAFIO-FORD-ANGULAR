import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginModule } from './login/login.module';
import { HomeComponent } from './home/home';


@NgModule({
  declarations: [App,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    HttpClientModule,
    HomeComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
    // O AuthService é geralmente 'providedIn: "root"', então não precisa ser listado aqui.
  ],
  bootstrap: [App]
})
export class AppModule { }