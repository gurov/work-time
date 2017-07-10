import { Component } from '@angular/core';

@Component({
  selector: 'work-time',
  templateUrl: 'work-time.component.html',
  styles: [`
  .table-sm td {
    padding: 0.3rem 0.2rem;
  }
  .work-time-table {
    width: 100%;
  }
  .work-time-table td, .work-time-table th {
    padding: 0.3rem 1px;
  }
  .work-time-table th {
    font-size: 90%;
  }
  .week-name-table {
    width: 9%;
    text-align: center;
  }
  `]
})
export class WorkTimeComponent {

  public addFormView: boolean = false;
  constructor() {
  }

}
