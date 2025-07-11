import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginModule } from './login/login.module';
import { TestedriveModule } from './testedrive/testedrive-module';





@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    HttpClientModule,
    TestedriveModule



  ],
  providers: [
    provideBrowserGlobalErrorListeners()
    // O AuthService é geralmente 'providedIn: "root"', então não precisa ser listado aqui.
  ],
  bootstrap: [App]
})
export class AppModule { }
