import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard } from './dashboard';
import { CabecalhoModule } from '../components/cabecalho/cabecalho-module';
import { FooterModule } from "../components/footer/footer-module";
import { FormsModule } from '@angular/forms';
import { CarocelModule } from '../components/carocel/carocel-module';


@NgModule({
  declarations: [
    Dashboard
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CabecalhoModule,
    FooterModule,
    FormsModule,
    CarocelModule
],
exports: [
  Dashboard
]
})
export class DashboardModule { }
