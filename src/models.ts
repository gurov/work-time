import { WorkTimeType } from './types';

export class WorkTime {
    id: string = '';
    type: WorkTimeType = WorkTimeType.REGULAR;
    weekday: number = 1;
    startTime: string = '';
    endTime: string = '';

    constructor() {
    }
}

export class TimeTable {
    [period: string]: {
        [weekName: string]: boolean;
    };
}
