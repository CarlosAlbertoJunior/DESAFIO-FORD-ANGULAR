import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [Login]
})
export class LoginModule { }
