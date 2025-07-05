import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { FooterModule } from "../components/footer/footer-module";
import { CabecalhoModule } from "../components/cabecalho/cabecalho-module";
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';



@NgModule({
  declarations: [Home],
  imports: [
    CommonModule,
    FooterModule,
    CabecalhoModule,
    DashboardRoutingModule
],
  exports: [Home]
})
export class HomeModule { }
