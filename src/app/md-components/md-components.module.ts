import { NgModule } from '@angular/core';
import { 
  MatInputModule,
  MatButtonModule
 } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule
  ]
})
export class MdComponentsModule { }
