import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTimeComponent } from './work-time.component';
import { FormsModule } from '@angular/forms';

export * from './work-time.component';
export * from './types';
export * from './models';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    WorkTimeComponent,
  ],
  exports: [
    WorkTimeComponent,
  ]
})
export class WorkTimeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WorkTimeModule,
      providers: []
    };
  }
}
