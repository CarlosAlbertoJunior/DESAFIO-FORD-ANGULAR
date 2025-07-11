import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testedrive } from './testedrive';
import { FooterModule } from '../components/footer/footer-module';
import { CabecalhoModule } from '../components/cabecalho/cabecalho-module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Testedrive
  ],
  imports: [
    CommonModule,
    FormsModule,
    FooterModule,
    CabecalhoModule,
    DashboardRoutingModule,
  ],
  exports: [
    Testedrive
  ]
})
export class TestedriveModule { }
