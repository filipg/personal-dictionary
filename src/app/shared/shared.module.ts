import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  exports: [
    ReactiveFormsModule,
    AppMaterialModule,
  ]
})
export class SharedModule { }
