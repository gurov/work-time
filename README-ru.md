# work-time

Это маленький компонент для редактирования рабочего расписания. Как выглядит:
![work-time preview](https://gurov.github.io/work-time/work-time-example.png)

Посмотреть и попробовать можно [здесь](https://gurov.github.io/work-time/).

## Установка

Для установки этой библиотеки, запустите:

```bash
$ npm install work-time --save
```

В твоём Angular `AppModule`:

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

## Использование

Однажды импортировав WorkTimeModule, вы можете использовать `<work-time>` компонент следующим образом:

###### Компонент

```typescript
import { WorkTimeType } from "work-time";
// ...
public data = [];
public workTimeType = WorkTimeType.REGULAR;
public readOnly = false;
```

###### HTML шаблон

```html
<work-time
      [(ngModel)]="data"
      [workTimeType]="workTimeType"
      [readonly]="readOnly"></work-time>
```

## Лицензия

MIT © [Pavel Gurov](mailto:lucius.gu@ya.ru)
