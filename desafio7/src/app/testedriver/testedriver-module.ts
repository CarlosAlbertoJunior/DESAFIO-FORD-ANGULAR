import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testedriver } from './testedriver';
import { FooterModule } from '../components/footer/footer-module';
import { CabecalhoModule } from '../components/cabecalho/cabecalho-module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Testedriver
  ],
  imports: [
    CommonModule,
    FormsModule,
    FooterModule,
    CabecalhoModule,
    DashboardRoutingModule
  ],
  exports: [
    Testedriver
  ]
})
export class TestedriverModule { }
