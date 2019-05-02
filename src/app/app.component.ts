import { Component } from '@angular/core';
import { WorkTimeType } from './modules/work-time/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'work-time';
  readOnly = false;
  data = [
    {
      id: '',
      type: WorkTimeType.REGULAR,
      weekday: 1,
      startTime: '00:00',
      endTime: '18:00'
    },
    {
      id: '',
      type: WorkTimeType.REGULAR,
      weekday: 2,
      startTime: '00:00',
      endTime: '18:00'
    }
  ];
  workTimeType: WorkTimeType = WorkTimeType.REGULAR;
}
