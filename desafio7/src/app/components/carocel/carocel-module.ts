import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carocel } from './carocel';



@NgModule({
  declarations: [Carocel],
  imports: [
    CommonModule
  ],
  exports: [
    Carocel
  ]
})
export class CarocelModule { }
