import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cabecalho } from './components/cabecalho/cabecalho';
import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    App,
    Cabecalho,
    LoginModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
    // O AuthService é geralmente 'providedIn: "root"', então não precisa ser listado aqui.
  ],
  bootstrap: [App]
})
export class AppModule { }