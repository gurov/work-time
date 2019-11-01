# work-time
It's small component for change work time scheduler. Preview:
![work-time preview](https://gurov.github.io/work-time/work-time-example.png)

See and try example [here](https://gurov.github.io/work-time/).

## Required libs
* angular 7+
* bootstrap 4+

## Installation

To install this library, run:

```bash
$ npm install work-time --save
```

In your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import 
import { WorkTimeModule } from 'work-time';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WorkTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
## Using
Once WorkTimeModule is imported, you can use `<work-time>` component:

###### Component
```typescript
import { WorkTimeType } from "work-time";
// ...
public data = [];
public workTimeType = WorkTimeType.REGULAR;
public readOnly = false;
```

###### Template
```html
<work-time
      [(ngModel)]="data"
      [workTimeType]="workTimeType"
      [readonly]="readOnly"></work-time>

```
###### Long Names
You can get a full textual representation of the day of the week eg. `Saturday` instead of `Sat` by setting `longNames` to true: 
```html
<work-time
      [(ngModel)]="data"
      [workTimeType]="workTimeType"
      [longNames]="true"></work-time>

```

###### Events
You can catch the `workTimesUpdated` event so you can execute actions when the work times are updated:
```html
<work-time
      [(ngModel)]="data"
      [workTimeType]="workTimeType"
      (workTimesUpdated)="doSomething()"></work-time>

```
## License

MIT © [Pavel Gurov](mailto:lucius.gu@ya.ru)
