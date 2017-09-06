import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { TimeTable, WorkTime } from './models';
import { WorkTimeType } from './types';
import { Time } from './interfaces';

@Component({
    selector: 'work-time',
    templateUrl: 'work-time.component.html',
    styles: [`
        .work-time-wrapper {
            max-width: 400px;
        }

        .table-sm td {
            padding: 0.3rem 0.2rem;
        }

        .work-time-table {
            width: 100%;
        }

        .work-time-table td {
            padding: 0.3rem 1px;
        }

        .work-time-table th, .work-time-table td.period {
            padding: 0.3rem;
        }

        .work-time-table th {
            font-size: 90%;
        }

        .work-time-table .form-control {
            cursor: pointer;
        }

        .week-name-table {
            width: 9%;
            text-align: center;
        }

        .intersection {
            background-color: #ec9595;
        }

        .close {
            font-size: 90%;
            float: none;
            margin-left: 5px;
            margin-right: 5px;
        }

        .form-control + .form-control {
            border-left: none;
        }
    `],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WorkTimeComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => WorkTimeComponent),
            multi: true
        }
    ]
})
export class WorkTimeComponent implements ControlValueAccessor, Validator {

    private _timeTable: TimeTable;
    public week = ['1', '2', '3', '4', '5', '6', '7'];
    public addFormView: boolean = false;
    public timeTable: TimeTable;
    public intervals: string[] = [];
    public startTime: Time = {h: 0, m: 0};
    public endTime: Time = {h: 18, m: 0};
    @Input() workTimeType: WorkTimeType = WorkTimeType.REGULAR;
    @Input() readonly: boolean = false;

    constructor() {
    }

    workTimeToTimeTables(workTimes: WorkTime[] = []): [TimeTable, string[]] {
        let intervals = workTimes.map(t => t.startTime + ' - ' + t.endTime);
        intervals = intervals.filter((item, pos) => intervals.indexOf(item) === pos);

        let timeTable: TimeTable = {};

        intervals.forEach(interval => {
            const [s, e] = interval.split(' - ');

            timeTable[interval] = {};

            for (let i = 1; i < 8; i++) {
                timeTable[interval][i] = workTimes
                    .filter(t => t.startTime === s && t.endTime === e && t.weekday === i)
                    .length > 0;
            }
        });

        return [timeTable, intervals.sort()];
    }

    timeTablesToWorkTime(timeTable: TimeTable): WorkTime[] {

        if (!timeTable) {
            return [];
        }

        let newList = [];
        Object.keys(timeTable).map(time => {
            const [startTime, endTime] = time.split(' - ');
            Object.keys(timeTable[time]).map(day => {
                if (timeTable[time][day]) {
                    newList.push({
                        id: '',
                        type: this.workTimeType,
                        weekday: +day,
                        startTime: startTime,
                        endTime: endTime,
                    });
                }
            });
        });

        return newList;
    }

    checkSomeIntersection() {
        if (!this.intervals || !this.intervals.length) {
            return false;
        }
        let result: boolean = false;
        this.intervals.forEach(i => {
            this.week.forEach(day => {
                if (this.checkDayIntervalIntersection(i, day)) {
                    result = true;
                }
            });
        });
        return result;
    }

    checkDayIntervalIntersection(interval: string, day: string): boolean {

        function getTimeInterval(period: string): number[] {
            return period
                .split(' - ')
                .map(time => {
                    const [h, m] = time.split(':').map(v => +v);
                    return +h * 60 + m;
                });
        }

        const [a1, a2] = getTimeInterval(interval);

        return this.timeTable[interval][day] && !!this.intervals
            .filter(i => i !== interval)
            .filter(i => this.timeTable[i][day])
            .filter(i => {
                const [b1, b2] = getTimeInterval(i);
                return (a1 > b1 && a1 < b2)
                    || (a2 > b1 && a2 < b2)
                    || (b1 > a1 && b1 < a2)
                    || (b2 > a1 && b2 < a2); // interval intersection
            }).length;
    }

    deleteInterval(interval: string) {
        delete this.timeTable[interval];
        this.intervals = this.intervals.filter(i => i !== interval);
        this.workTimes = this.timeTable;
    }

    timeFormat(time: Time): string {
        const hS = time.h < 10 ? '0' + time.h : time.h;
        const mS = time.m < 10 ? '0' + time.m : time.m;
        return `${hS}:${mS}`;
    }

    isValidNewInterval(): boolean {
        const sT = this.startTime.h * 60 + this.startTime.m;
        const eT = this.endTime.h * 60 + this.endTime.m;
        return eT > sT && eT <= 60 * 24 && sT !== eT;
    }

    addInterval() {
        const newTime = `${this.timeFormat(this.startTime)} - ${this.timeFormat(this.endTime)}`;

        if (!~this.intervals.indexOf(newTime)) {
            this.intervals.push(newTime);
            this.intervals.sort();
            this.timeTable[newTime] = {};
            this.week.forEach(day => {
                this.timeTable[newTime][day] = false;
            });
        }
        this.addFormView = false;
    }

    get workTimes() {
        return this._timeTable;
    }

    set workTimes(value) {
        this._timeTable = value;
        this.propagateChange(this.timeTablesToWorkTime(value));
    }

    public validate(c: FormControl) {
        return this.checkSomeIntersection() ? {
            intersection: true
        } : null;
    }

    changeTime() {
        this.workTimes = this.timeTable;
    }

    writeValue(workTimes: WorkTime[] = []): void {
        if (workTimes) {
            [this.timeTable, this.intervals] = this.workTimeToTimeTables(workTimes);
        }
    }

    propagateChange = (_: any) => {
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }


}
