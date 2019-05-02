import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTimeComponent } from './work-time.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkTimeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    WorkTimeComponent
  ]
})
export class WorkTimeModule { }
