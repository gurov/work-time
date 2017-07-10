import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTimeComponent } from './work-time.component';

export * from './work-time.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkTimeComponent
  ],
  exports: [
    WorkTimeComponent
  ]
})
export class WorkTimeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WorkTimeModule
    };
  }
}
