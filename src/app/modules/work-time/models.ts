import { WorkTimeType } from './types';

export class WorkTime {
    id = '';
    type: WorkTimeType = WorkTimeType.REGULAR;
    weekday = 1;
    startTime = '';
    endTime = '';

    constructor() {
    }
}

export class TimeTable {
    [period: string]: {
        [weekName: string]: boolean;
    };
}
