import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Caroucel } from './caroucel';



@NgModule({
  declarations: [Caroucel],
  imports: [
    CommonModule
  ],
  exports: [
    Caroucel
  ]
})
export class CaroucelModule { }
