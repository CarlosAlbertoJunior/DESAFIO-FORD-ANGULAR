import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login';



@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule
  ],
  exports: [Login]
})
export class LoginModule { }
