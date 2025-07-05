import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { FooterModule } from "../components/footer/footer-module";



@NgModule({
  declarations: [Home],
  imports: [
    CommonModule,
    FooterModule
],
  exports: [Home]
})
export class HomeModule { }
